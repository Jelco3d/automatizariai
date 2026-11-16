import { supabase } from "@/integrations/supabase/client";

export type BlogSettingsValues = {
  blog_title: string;
  blog_description: string;
  logo_url: string;
  favicon_url: string;
  default_author: string;
  default_seo_title: string;
  default_seo_description: string;
  default_og_image: string;
  comments_enabled: boolean;
  spam_words: string[];
};

export const BLOG_SETTING_DEFAULTS: BlogSettingsValues = {
  blog_title: "Blog",
  blog_description: "",
  logo_url: "",
  favicon_url: "",
  default_author: "",
  default_seo_title: "",
  default_seo_description: "",
  default_og_image: "",
  comments_enabled: true,
  spam_words: [],
};

/** Keys that visitors must not read. */
export const PRIVATE_SETTING_KEYS: (keyof BlogSettingsValues)[] = ["spam_words"];

export async function fetchBlogSettings(): Promise<BlogSettingsValues> {
  const { data } = await supabase.from("blog_settings").select("key,value");
  const out = { ...BLOG_SETTING_DEFAULTS } as Record<string, unknown>;
  (data ?? []).forEach((r) => { if (r.key in out) out[r.key] = r.value; });
  return out as BlogSettingsValues;
}
