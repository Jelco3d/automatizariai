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

  const getStatusBadge = (status: string | null) => {
    if (!status) return <span className="text-gray-500">-</span>;
    
    const styles = {
      active: 'bg-green-500/20 text-green-400 border-green-500/30',
      prospect: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      inactive: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    };
    
    const labels = {
      active: 'Client',
      prospect: 'Prospect',
      inactive: 'Inactiv',
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs border ${styles[status as keyof typeof styles] || styles.inactive}`}>
        {labels[status as keyof typeof labels] || status}
      </span>
    );
  };

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

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {isLoading ? (
            <div className="text-center text-gray-400 py-8">Se încarcă...</div>
          ) : filteredClients.length === 0 ? (
            <div className="text-center text-gray-400 py-8">Nu există clienți</div>
          ) : (
            filteredClients.map((client) => (
              <Card key={client.id} className="bg-[#0F1117] border-gray-700 p-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-white font-semibold text-sm">{client.name}</p>
                      <p className="text-gray-400 text-xs">{client.email}</p>
                    </div>
                    {getStatusBadge(client.status || 'active')}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                    <div>
                      <p className="text-gray-400">Telefon</p>
                      <p className="text-white">{client.phone || '-'}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">CUI</p>
                      <p className="text-white">{client.cui || '-'}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2 border-t border-gray-700">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(client)}
                      className="flex-1 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 text-xs"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Editează
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteId(client.id)}
                      className="flex-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 text-xs"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Șterge
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 hover:bg-transparent">
                <TableHead className="text-gray-400">Nume</TableHead>
                <TableHead className="text-gray-400">Email</TableHead>
                <TableHead className="text-gray-400">Telefon</TableHead>
                <TableHead className="text-gray-400">CUI</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400 text-right">Acțiuni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-400">
                    Se încarcă...
                  </TableCell>
                </TableRow>
              ) : filteredClients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-400">
                    Nu există clienți
                  </TableCell>
                </TableRow>
              ) : (
                filteredClients.map((client) => (
                  <TableRow key={client.id} className="border-gray-700 hover:bg-gray-800/50">
                    <TableCell className="text-white font-medium">{client.name}</TableCell>
                    <TableCell className="text-gray-300">{client.email}</TableCell>
                    <TableCell className="text-gray-300">{client.phone || '-'}</TableCell>
                    <TableCell className="text-gray-300">{client.cui || '-'}</TableCell>
                    <TableCell>{getStatusBadge(client.status || 'active')}</TableCell>
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
