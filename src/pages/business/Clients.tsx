import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Sidebar } from "@/components/admin/Sidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Session } from "@supabase/supabase-js";
import { ClientsTable } from "@/components/business/clients/ClientsTable";
import { ClientForm } from "@/components/business/clients/ClientForm";
import type { Tables } from "@/integrations/supabase/types";

type Client = Tables<'clients'>;

export default function Clients() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingClient(null);
  };

  if (loading) {
    return <div className="min-h-screen bg-[#0F1117] flex items-center justify-center">
      <p className="text-white">Se încarcă...</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-[#0F1117] text-white flex">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6 pt-20 md:pt-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-3">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Clienți</h1>
          <div className="flex md:hidden justify-center w-full">
            <img 
              src="/lovable-uploads/ed45f672-b988-4257-832b-bec499caad23.png" 
              alt="AI Automatizari" 
              className="h-12 w-auto rounded-lg" 
            />
          </div>
          <Button onClick={() => setFormOpen(true)} className="bg-purple-600 hover:bg-purple-700 w-full md:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Client Nou
          </Button>
        </div>

        <ClientsTable onEdit={handleEdit} />
        <ClientForm open={formOpen} onOpenChange={handleCloseForm} client={editingClient} />
      </div>
    </div>
  );
}
