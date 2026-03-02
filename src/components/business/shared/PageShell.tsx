import { useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Sidebar } from "@/components/admin/Sidebar";
import { Skeleton } from "@/components/ui/skeleton";

interface PageShellProps {
  children: ReactNode;
  loading?: boolean;
}

export function PageShell({ children, loading = false }: PageShellProps) {
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/auth");
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/auth");
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] text-white flex">
        <Sidebar />
        <div className="flex-1 p-4 md:p-8 pt-20 md:pt-8">
          <Skeleton className="h-8 w-48 mb-8 bg-white/5" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-28 rounded-xl bg-white/5" />
            ))}
          </div>
          <Skeleton className="h-64 rounded-xl bg-white/5" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white flex">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8 pt-20 md:pt-8 overflow-auto">
        {children}
      </div>
    </div>
  );
}
