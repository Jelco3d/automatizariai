import DOMPurify from "dompurify";
import { supabase } from "@/integrations/supabase/client";

export type BlogPostRow = {
  id: string; title: string; slug: string; excerpt: string | null; content: string;
  cover_image: string | null; status: string; published_at: string | null; scheduled_at: string | null;
  category_id: string | null; seo_title: string | null; seo_description: string | null; og_image: string | null;
  reading_time: number; views: number; author_name: string | null; json_ld: unknown; updated_at: string; created_at: string;
};

export const SITE_URL = "https://aiautomatizari.ro";

/** Only safe formatting tags survive — no scripts, no inline handlers. */
export const sanitizeHtml = (html: string) =>
  DOMPurify.sanitize(html, { USE_PROFILES: { html: true }, FORBID_TAGS: ["style", "form", "input"], FORBID_ATTR: ["style"] });

export const slugify = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);

export const absUrl = (u?: string | null) => (!u ? `${SITE_URL}/og-image.png` : u.startsWith("http") ? u : `${SITE_URL}${u}`);

/** Uploads an image to the private blog bucket and returns a long-lived signed link. */
export async function uploadBlogImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${new Date().getFullYear()}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("blog-images").upload(path, file, { contentType: file.type });
  if (error) throw error;
  const { data, error: e2 } = await supabase.storage.from("blog-images").createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
  if (e2 || !data) throw e2 ?? new Error("no url");
  return data.signedUrl;
}

export const formatRoDate = (d: string) =>
  new Date(d).toLocaleDateString("ro-RO", { year: "numeric", month: "long", day: "numeric" });
