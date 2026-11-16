import { useEffect, useState, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type State = "loading" | "allowed" | "signed_out" | "forbidden";

// Remember the check for the session so switching admin pages doesn't flash a blank screen.
let cached: { userId: string; state: State } | null = null;
supabase.auth.onAuthStateChange((_e, session) => {
  if (!session || session.user.id !== cached?.userId) cached = null;
});

// Load every admin page in the background once access is confirmed, so navigation is instant.
let preloaded = false;
function preloadAdminPages() {
  if (preloaded) return;
  preloaded = true;
  void Promise.all([
    import("@/pages/admin/AdminBlog"), import("@/pages/admin/BlogPosts"), import("@/pages/admin/NewBlogPost"),
    import("@/pages/admin/Categories"), import("@/pages/admin/Comments"), import("@/pages/admin/BlogAnalytics"),
    import("@/pages/admin/BlogSettings"),
  ]);
}

/** Lets only signed-in admins/editors reach /admin/* (checked in the database). */
export function BlogStaffGuard({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(cached?.state ?? "loading");
  const location = useLocation();

  useEffect(() => {
    let active = true;
    if (cached) { if (cached.state === "allowed") preloadAdminPages(); return; }
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return active && setState("signed_out");
      const { data } = await supabase.rpc("is_blog_staff", { _user_id: user.id });
      const next: State = data ? "allowed" : "forbidden";
      cached = { userId: user.id, state: next };
      if (next === "allowed") preloadAdminPages();
      if (active) setState(next);
    })();
    return () => { active = false; };
  }, []);

  if (state === "loading") return <div className="min-h-screen bg-background" />;
  if (state === "signed_out") return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  if (state === "forbidden")
    return (
      <div className="min-h-screen bg-[#0a0e1a] text-white flex items-center justify-center p-6 text-center">
        <p>Nu ai acces la administrarea blogului.</p>
      </div>
    );
  return <>{children}</>;
}
