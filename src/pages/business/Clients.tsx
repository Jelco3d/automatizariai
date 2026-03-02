import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ClientsTable } from "@/components/business/clients/ClientsTable";
import { ClientForm } from "@/components/business/clients/ClientForm";
import { PageShell } from "@/components/business/shared/PageShell";
import { PageHeader } from "@/components/business/shared/PageHeader";
import type { Tables } from "@/integrations/supabase/types";

type Client = Tables<'clients'>;

export default function Clients() {
  const [formOpen, setFormOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingClient(null);
  };

  return (
    <PageShell>
      <PageHeader
        title="Clienți"
        action={
          <Button onClick={() => setFormOpen(true)} className="btn-3d-gold w-full md:w-auto text-sm md:text-base px-5 h-9 md:h-10">
            <Plus className="h-4 w-4 mr-2" />
            Client Nou
          </Button>
        }
      />
      <ClientsTable onEdit={handleEdit} />
      <ClientForm open={formOpen} onOpenChange={handleCloseForm} client={editingClient} />
    </PageShell>
  );
}
