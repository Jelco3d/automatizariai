CREATE OR REPLACE FUNCTION public.blog_posts_before_write() RETURNS trigger
LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.updated_at := now();
  NEW.reading_time := GREATEST(1, ceil(coalesce(array_length(regexp_split_to_array(trim(regexp_replace(coalesce(NEW.content,''), '<[^>]+>', ' ', 'g')), '\s+'), 1),0) / 200.0)::int);
  IF NEW.status = 'scheduled' THEN
    IF NEW.scheduled_at IS NULL THEN RAISE EXCEPTION 'scheduled_at is required for scheduled posts'; END IF;
    NEW.published_at := NEW.scheduled_at;
  ELSIF NEW.status = 'published' AND NEW.published_at IS NULL THEN
    NEW.published_at := now();
  END IF;
  RETURN NEW;
END $$;
UPDATE public.blog_posts SET content = content;