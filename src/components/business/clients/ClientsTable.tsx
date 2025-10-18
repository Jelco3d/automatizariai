import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2, Search } from 'lucide-react';
import { useClients } from '@/hooks/useClients';
import { DeleteDialog } from '@/components/business/shared/DeleteDialog';
import type { Tables } from '@/integrations/supabase/types';

type Client = Tables<'clients'>;

interface ClientsTableProps {
  onEdit: (client: Client) => void;
}

export function ClientsTable({ onEdit }: ClientsTableProps) {
  const { clients, isLoading, deleteClient } = useClients();
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Card className="bg-[#1A1F2C] border-purple-500/20 p-3 md:p-6">
        <div className="mb-3 md:mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Caută client..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-[#0F1117] border-gray-700 text-white text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto -mx-3 md:mx-0">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <Table className="min-w-[600px]">
                <TableHeader>
                  <TableRow className="border-gray-700 hover:bg-transparent">
                    <TableHead className="text-gray-400 text-xs md:text-sm">Nume</TableHead>
                    <TableHead className="text-gray-400 text-xs md:text-sm">Email</TableHead>
                    <TableHead className="text-gray-400 text-xs md:text-sm">Telefon</TableHead>
                    <TableHead className="text-gray-400 text-xs md:text-sm">CUI</TableHead>
                    <TableHead className="text-gray-400 text-xs md:text-sm text-right">Acțiuni</TableHead>
                  </TableRow>
                </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-400">
                    Se încarcă...
                  </TableCell>
                </TableRow>
              ) : filteredClients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-400">
                    Nu există clienți
                  </TableCell>
                </TableRow>
              ) : (
                filteredClients.map((client) => (
                  <TableRow key={client.id} className="border-gray-700 hover:bg-gray-800/50">
                    <TableCell className="text-white font-medium text-xs md:text-sm">{client.name}</TableCell>
                    <TableCell className="text-gray-300 text-xs md:text-sm">{client.email}</TableCell>
                    <TableCell className="text-gray-300 text-xs md:text-sm">{client.phone || '-'}</TableCell>
                    <TableCell className="text-gray-300 text-xs md:text-sm">{client.cui || '-'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(client)}
                          className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteId(client.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
              </TableBody>
            </Table>
          </div>
        </div>
        </div>
      </Card>

      <DeleteDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) {
            deleteClient.mutate(deleteId);
            setDeleteId(null);
          }
        }}
        title="Șterge client"
        description="Ești sigur că vrei să ștergi acest client? Această acțiune nu poate fi anulată."
        isLoading={deleteClient.isPending}
      />
    </>
  );
}
