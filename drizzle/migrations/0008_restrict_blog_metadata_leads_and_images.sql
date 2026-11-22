DROP POLICY "Public reads categories" ON public.blog_categories;
CREATE POLICY "Public reads published categories"
ON public.blog_categories FOR SELECT
TO public
USING (
  EXISTS (
    SELECT 1
    FROM public.blog_posts bp
    WHERE bp.category_id = blog_categories.id
      AND bp.status = 'published'::public.post_status
      AND bp.published_at <= now()
  )
);

DROP POLICY "Public reads post tags" ON public.blog_post_tags;
CREATE POLICY "Public reads published post tags"
ON public.blog_post_tags FOR SELECT
TO public
USING (
  EXISTS (
    SELECT 1
    FROM public.blog_posts bp
    WHERE bp.id = blog_post_tags.post_id
      AND bp.status = 'published'::public.post_status
      AND bp.published_at <= now()
  )
);

DROP POLICY "Public reads tags" ON public.blog_tags;
CREATE POLICY "Public reads published tags"
ON public.blog_tags FOR SELECT
TO public
USING (
  EXISTS (
    SELECT 1
    FROM public.blog_post_tags bpt
    JOIN public.blog_posts bp ON bp.id = bpt.post_id
    WHERE bpt.tag_id = blog_tags.id
      AND bp.status = 'published'::public.post_status
      AND bp.published_at <= now()
  )
);

DROP POLICY "Allow public insert" ON public."leadmagnet-audit-strategic";
CREATE POLICY "Allow validated public audit submissions"
ON public."leadmagnet-audit-strategic" FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(btrim(full_name)) BETWEEN 2 AND 160
  AND char_length(email) BETWEEN 3 AND 254
  AND email ~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
  AND char_length(btrim(phone)) BETWEEN 6 AND 40
  AND char_length(btrim(company_name)) BETWEEN 2 AND 180
  AND cui IS NOT NULL
  AND char_length(btrim(cui)) BETWEEN 2 AND 32
  AND role_in_company IS NOT NULL
  AND char_length(btrim(role_in_company)) BETWEEN 1 AND 100
  AND source = 'audit-form-modal'
);

DROP POLICY "Anyone can submit a lead" ON public.page_leads;
CREATE POLICY "Anyone can submit a validated lead"
ON public.page_leads FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(btrim(full_name)) BETWEEN 2 AND 160
  AND char_length(email) BETWEEN 3 AND 254
  AND email ~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
  AND (phone IS NULL OR char_length(btrim(phone)) BETWEEN 6 AND 40)
  AND char_length(btrim(source)) BETWEEN 1 AND 80
  AND (source_path IS NULL OR (source_path LIKE '/%' AND char_length(source_path) <= 500))
  AND jsonb_typeof(extra) = 'object'
  AND pg_column_size(extra) <= 16384
);

DROP POLICY "Public reads blog images" ON storage.objects;
CREATE POLICY "Staff reads blog images"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'blog-images'
  AND public.is_blog_staff(auth.uid())
);