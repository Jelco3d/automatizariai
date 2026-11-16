ALTER TYPE public.comment_status ADD VALUE IF NOT EXISTS 'trash';
ALTER TABLE public.blog_categories ADD COLUMN IF NOT EXISTS color text NOT NULL DEFAULT '#D97706', ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 0;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS subtitle text, ADD COLUMN IF NOT EXISTS allow_comments boolean NOT NULL DEFAULT true;
ALTER TABLE public.blog_comments ADD COLUMN IF NOT EXISTS is_staff_reply boolean NOT NULL DEFAULT false;
ALTER TABLE public.blog_post_views ADD COLUMN IF NOT EXISTS device text, ADD COLUMN IF NOT EXISTS duration_seconds integer;

DROP POLICY IF EXISTS "Anyone submits pending comments" ON public.blog_comments;
CREATE POLICY "Anyone submits pending comments" ON public.blog_comments FOR INSERT TO anon, authenticated
WITH CHECK (status = 'pending'::comment_status AND is_staff_reply = false AND EXISTS (SELECT 1 FROM public.blog_posts p WHERE p.id = blog_comments.post_id AND p.status = 'published' AND p.published_at <= now() AND p.allow_comments));

CREATE OR REPLACE VIEW public.blog_comments_public WITH (security_invoker = false) AS
SELECT id, post_id, parent_id, author_name, content, created_at, is_staff_reply FROM public.blog_comments WHERE status = 'approved'::comment_status;
GRANT SELECT ON public.blog_comments_public TO anon, authenticated;

DROP FUNCTION IF EXISTS public.increment_post_view(text, text, text);
CREATE FUNCTION public.increment_post_view(_slug text, _session text, _referrer text DEFAULT NULL, _device text DEFAULT NULL)
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _id uuid; _vid uuid;
BEGIN
  SELECT id INTO _id FROM blog_posts WHERE slug = _slug AND status = 'published' AND published_at <= now();
  IF _id IS NULL THEN RETURN NULL; END IF;
  SELECT id INTO _vid FROM blog_post_views WHERE post_id = _id AND session_hash = _session AND viewed_at > now() - interval '1 day' ORDER BY viewed_at DESC LIMIT 1;
  IF _vid IS NOT NULL THEN RETURN _vid; END IF;
  INSERT INTO blog_post_views (post_id, session_hash, referrer, device)
  VALUES (_id, left(_session,64), left(_referrer,500), CASE WHEN _device IN ('mobile','tablet','desktop') THEN _device END)
  RETURNING id INTO _vid;
  UPDATE blog_posts SET views = views + 1 WHERE id = _id;
  RETURN _vid;
END $$;
GRANT EXECUTE ON FUNCTION public.increment_post_view(text, text, text, text) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.record_post_read_time(_view_id uuid, _session text, _seconds integer)
RETURNS void LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  UPDATE blog_post_views SET duration_seconds = GREATEST(COALESCE(duration_seconds,0), LEAST(GREATEST(_seconds,0), 3600))
  WHERE id = _view_id AND session_hash = left(_session,64);
$$;
GRANT EXECUTE ON FUNCTION public.record_post_read_time(uuid, text, integer) TO anon, authenticated;