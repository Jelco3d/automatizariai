import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type AdminPost = {
  id: string; title: string; slug: string; excerpt: string | null; subtitle: string | null; cover_image: string | null;
  status: "draft" | "scheduled" | "published" | "archived"; published_at: string | null; scheduled_at: string | null;
  updated_at: string; created_at: string; views: number; reading_time: number; category_id: string | null;
};
export type AdminCategory = { id: string; name: string; slug: string; description: string | null; color: string; sort_order: number; created_at: string };

export const blogKeys = {
  posts: ["blog-admin", "posts"] as const,
  categories: ["blog-admin", "categories"] as const,
  commentCounts: ["blog-admin", "comment-counts"] as const,
  pending: ["blog-admin", "pending"] as const,
  me: ["blog-admin", "me"] as const,
};

export function usePosts() {
  return useQuery({
    queryKey: blogKeys.posts,
    queryFn: async () => {
      const { data, error } = await supabase.from("blog_posts")
        .select("id,title,slug,excerpt,subtitle,cover_image,status,published_at,scheduled_at,updated_at,created_at,views,reading_time,category_id")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as AdminPost[];
    },
  });
}

export function useCategories() {
  return useQuery({
    queryKey: blogKeys.categories,
    queryFn: async () => {
      const { data, error } = await supabase.from("blog_categories").select("*").order("sort_order").order("name");
      if (error) throw error;
      return (data ?? []) as AdminCategory[];
    },
  });
}

/** comments per post (all statuses except trash) */
export function useCommentCounts() {
  return useQuery({
    queryKey: blogKeys.commentCounts,
    queryFn: async () => {
      const { data, error } = await supabase.from("blog_comments").select("post_id,status").neq("status", "trash");
      if (error) throw error;
      const m: Record<string, number> = {};
      (data ?? []).forEach((c) => { m[c.post_id] = (m[c.post_id] ?? 0) + 1; });
      return m;
    },
  });
}

export function usePendingCount() {
  return useQuery({
    queryKey: blogKeys.pending,
    queryFn: async () => {
      const { count } = await supabase.from("blog_comments").select("id", { count: "exact", head: true }).eq("status", "pending");
      return count ?? 0;
    },
    refetchInterval: 60_000,
  });
}

export function useMe() {
  return useQuery({
    queryKey: blogKeys.me,
    staleTime: Infinity,
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      const [{ data: profile }, { data: isAdmin }] = await Promise.all([
        supabase.from("profiles").select("full_name").eq("id", user.id).maybeSingle(),
        supabase.rpc("has_role", { _user_id: user.id, _role: "admin" }),
      ]);
      const name = profile?.full_name || (user.user_metadata?.full_name as string) || user.email?.split("@")[0] || "";
      return { id: user.id, email: user.email ?? "", name, isAdmin: !!isAdmin };
    },
  });
}

export function useInvalidateBlog() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: ["blog-admin"] });
}

/** daily buckets for the last `days` days ending today */
export function dailySeries<T>(rows: T[], dateOf: (r: T) => string, days: number, end = new Date()) {
  const out: { date: string; label: string; value: number }[] = [];
  const idx: Record<string, number> = {};
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(end); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - i);
    const key = localKey(d);
    idx[key] = out.length;
    out.push({ date: key, label: d.toLocaleDateString("ro-RO", { day: "numeric", month: "short" }), value: 0 });
  }
  rows.forEach((r) => { const k = localKey(new Date(dateOf(r))); if (k in idx) out[idx[k]].value++; });
  return out;
}

export const localKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
