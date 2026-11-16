ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'editor';
CREATE TYPE public.post_status AS ENUM ('draft','scheduled','published','archived');
CREATE TYPE public.comment_status AS ENUM ('pending','approved','spam');

CREATE OR REPLACE FUNCTION public.is_blog_staff(_user_id uuid) RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role::text IN ('admin','editor'))
$$;

CREATE TABLE public.blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL, slug text NOT NULL UNIQUE, description text,
  created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE public.blog_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL, slug text NOT NULL UNIQUE);
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL, slug text NOT NULL UNIQUE, excerpt text, content text NOT NULL DEFAULT '',
  cover_image text, status public.post_status NOT NULL DEFAULT 'draft',
  published_at timestamptz, scheduled_at timestamptz, author_id uuid,
  category_id uuid REFERENCES public.blog_categories(id) ON DELETE SET NULL,
  seo_title text, seo_description text, og_image text,
  reading_time integer NOT NULL DEFAULT 1, views integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now());
CREATE INDEX blog_posts_status_pub_idx ON public.blog_posts (status, published_at DESC);
CREATE INDEX blog_posts_category_idx ON public.blog_posts (category_id);
CREATE TABLE public.blog_post_tags (
  post_id uuid NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  tag_id uuid NOT NULL REFERENCES public.blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id));
CREATE TABLE public.blog_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  parent_id uuid REFERENCES public.blog_comments(id) ON DELETE CASCADE,
  author_name text NOT NULL, author_email text NOT NULL, content text NOT NULL,
  status public.comment_status NOT NULL DEFAULT 'pending', ip_hash text,
  created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE public.blog_post_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  viewed_at timestamptz NOT NULL DEFAULT now(), session_hash text, referrer text);
CREATE INDEX blog_post_views_post_idx ON public.blog_post_views (post_id, viewed_at);
CREATE TABLE public.blog_settings (
  key text PRIMARY KEY, value jsonb NOT NULL, is_public boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now());

GRANT SELECT ON public.blog_categories, public.blog_tags, public.blog_post_tags, public.blog_posts, public.blog_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.blog_categories, public.blog_tags, public.blog_post_tags, public.blog_posts, public.blog_settings, public.blog_comments TO authenticated;
GRANT SELECT ON public.blog_post_views TO authenticated;
GRANT INSERT ON public.blog_comments TO anon;
GRANT ALL ON public.blog_categories, public.blog_tags, public.blog_post_tags, public.blog_posts, public.blog_settings, public.blog_comments, public.blog_post_views TO service_role;

ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_post_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public reads categories" ON public.blog_categories FOR SELECT USING (true);
CREATE POLICY "Staff manages categories" ON public.blog_categories FOR ALL TO authenticated USING (public.is_blog_staff(auth.uid())) WITH CHECK (public.is_blog_staff(auth.uid()));
CREATE POLICY "Public reads tags" ON public.blog_tags FOR SELECT USING (true);
CREATE POLICY "Staff manages tags" ON public.blog_tags FOR ALL TO authenticated USING (public.is_blog_staff(auth.uid())) WITH CHECK (public.is_blog_staff(auth.uid()));
CREATE POLICY "Public reads post tags" ON public.blog_post_tags FOR SELECT USING (true);
CREATE POLICY "Staff manages post tags" ON public.blog_post_tags FOR ALL TO authenticated USING (public.is_blog_staff(auth.uid())) WITH CHECK (public.is_blog_staff(auth.uid()));
CREATE POLICY "Public reads published posts" ON public.blog_posts FOR SELECT USING (status = 'published' AND published_at <= now());
CREATE POLICY "Staff manages posts" ON public.blog_posts FOR ALL TO authenticated USING (public.is_blog_staff(auth.uid())) WITH CHECK (public.is_blog_staff(auth.uid()));
CREATE POLICY "Anyone submits pending comments" ON public.blog_comments FOR INSERT TO anon, authenticated
  WITH CHECK (status = 'pending' AND EXISTS (SELECT 1 FROM public.blog_posts p WHERE p.id = post_id AND p.status = 'published' AND p.published_at <= now()));
CREATE POLICY "Staff manages comments" ON public.blog_comments FOR ALL TO authenticated USING (public.is_blog_staff(auth.uid())) WITH CHECK (public.is_blog_staff(auth.uid()));
CREATE POLICY "Staff reads views" ON public.blog_post_views FOR SELECT TO authenticated USING (public.is_blog_staff(auth.uid()));
CREATE POLICY "Public reads public settings" ON public.blog_settings FOR SELECT USING (is_public);
CREATE POLICY "Admin manages settings" ON public.blog_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- approved comments for the public, without emails
CREATE VIEW public.blog_comments_public AS
  SELECT id, post_id, parent_id, author_name, content, created_at FROM public.blog_comments WHERE status = 'approved';
GRANT SELECT ON public.blog_comments_public TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.blog_posts_before_write() RETURNS trigger
LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.updated_at := now();
  NEW.reading_time := GREATEST(1, ceil(array_length(regexp_split_to_array(trim(coalesce(NEW.content,'')), '\s+'), 1) / 200.0)::int);
  IF NEW.status = 'scheduled' THEN
    IF NEW.scheduled_at IS NULL THEN RAISE EXCEPTION 'scheduled_at is required for scheduled posts'; END IF;
    NEW.published_at := NEW.scheduled_at;
  ELSIF NEW.status = 'published' AND NEW.published_at IS NULL THEN
    NEW.published_at := now();
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER blog_posts_before_write BEFORE INSERT OR UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.blog_posts_before_write();

CREATE OR REPLACE FUNCTION public.increment_post_view(_slug text, _session text, _referrer text DEFAULT NULL) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _id uuid;
BEGIN
  SELECT id INTO _id FROM blog_posts WHERE slug = _slug AND status = 'published' AND published_at <= now();
  IF _id IS NULL THEN RETURN; END IF;
  IF EXISTS (SELECT 1 FROM blog_post_views WHERE post_id = _id AND session_hash = _session AND viewed_at > now() - interval '1 day') THEN RETURN; END IF;
  INSERT INTO blog_post_views (post_id, session_hash, referrer) VALUES (_id, left(_session,64), left(_referrer,500));
  UPDATE blog_posts SET views = views + 1 WHERE id = _id;
END $$;
GRANT EXECUTE ON FUNCTION public.increment_post_view(text, text, text) TO anon, authenticated;

CREATE POLICY "Public reads blog images" ON storage.objects FOR SELECT USING (bucket_id = 'blog-images');
CREATE POLICY "Staff uploads blog images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'blog-images' AND public.is_blog_staff(auth.uid()));
CREATE POLICY "Staff updates blog images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'blog-images' AND public.is_blog_staff(auth.uid()));
CREATE POLICY "Staff deletes blog images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'blog-images' AND public.is_blog_staff(auth.uid()));