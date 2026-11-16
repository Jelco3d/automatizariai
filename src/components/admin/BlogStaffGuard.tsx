import { useEffect, useState, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type State = "loading" | "allowed" | "signed_out" | "forbidden";

/** Lets only signed-in admins/editors reach /admin/* (checked in the database). */
export function BlogStaffGuard({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>("loading");
  const location = useLocation();

  useEffect(() => {
    let active = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return active && setState("signed_out");
      const { data } = await supabase.rpc("is_blog_staff", { _user_id: user.id });
      if (active) setState(data ? "allowed" : "forbidden");
    })();
    return () => { active = false; };
  }, []);

  if (state === "loading") return <div className="min-h-screen bg-[#0a0e1a]" />;
  if (state === "signed_out") return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  if (state === "forbidden")
    return (
      <div className="min-h-screen bg-[#0a0e1a] text-white flex items-center justify-center p-6 text-center">
        <p>Nu ai acces la administrarea blogului.</p>
      </div>
    );
  return <>{children}</>;
}
