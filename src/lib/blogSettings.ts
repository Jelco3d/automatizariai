import { supabase } from "@/integrations/supabase/client";

export type BlogSettingsValues = {
  blog_title: string;
  blog_description: string;
  default_author: string;
  comments_enabled: boolean;
};

export const BLOG_SETTING_DEFAULTS: BlogSettingsValues = {
  blog_title: "Blog",
  blog_description: "",
  default_author: "",
  comments_enabled: true,
};

export async function fetchBlogSettings(): Promise<BlogSettingsValues> {
  const { data } = await supabase.from("blog_settings").select("key,value");
  const out = { ...BLOG_SETTING_DEFAULTS } as Record<string, unknown>;
  (data ?? []).forEach((r) => { if (r.key in out) out[r.key] = r.value; });
  return out as BlogSettingsValues;
}
