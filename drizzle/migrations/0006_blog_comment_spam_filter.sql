CREATE OR REPLACE FUNCTION public.blog_comments_spam_filter()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _words jsonb; _w text;
BEGIN
  IF NEW.status <> 'pending' THEN RETURN NEW; END IF;
  SELECT value INTO _words FROM blog_settings WHERE key = 'spam_words';
  IF _words IS NULL OR jsonb_typeof(_words) <> 'array' THEN RETURN NEW; END IF;
  FOR _w IN SELECT jsonb_array_elements_text(_words) LOOP
    IF length(trim(_w)) > 0 AND (position(lower(trim(_w)) in lower(NEW.content)) > 0 OR position(lower(trim(_w)) in lower(NEW.author_name)) > 0) THEN
      NEW.status := 'spam'; RETURN NEW;
    END IF;
  END LOOP;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS blog_comments_spam_filter ON public.blog_comments;
CREATE TRIGGER blog_comments_spam_filter BEFORE INSERT ON public.blog_comments FOR EACH ROW EXECUTE FUNCTION public.blog_comments_spam_filter();