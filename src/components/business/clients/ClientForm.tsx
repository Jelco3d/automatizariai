import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clientSchema, type ClientFormData } from '@/schemas/clientSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useClients } from '@/hooks/useClients';
import type { Tables } from '@/integrations/supabase/types';

type Client = Tables<'clients'>;

interface ClientFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client?: Client | null;
  onClientCreated?: (clientId: string) => void;
}

export function ClientForm({ open, onOpenChange, client, onClientCreated }: ClientFormProps) {
  const { createClient, updateClient } = useClients();
  const isEditing = !!client;

  const form = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: client ? {
      name: client.name,
      email: client.email,
      phone: client.phone || undefined,
      cui: client.cui || undefined,
      address: client.address || undefined,
      status: (client.status as 'active' | 'prospect' | 'inactive') || 'active',
    } : {
      name: '',
      email: '',
      phone: undefined,
      cui: undefined,
      address: undefined,
      status: 'active',
    },
  });

  const onSubmit = async (data: ClientFormData) => {
    const clientData = {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      cui: data.cui || null,
      address: data.address || null,
      status: data.status,
    };

    if (isEditing && client) {
      await updateClient.mutateAsync({ id: client.id, ...clientData });
      onOpenChange(false);
    } else {
      const result = await createClient.mutateAsync(clientData);
      if (onClientCreated && result) {
        onClientCreated(result.id);
      } else {
        onOpenChange(false);
      }
    }
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A1F2C] border-purple-500/20 text-white w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto p-4 md:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl">{isEditing ? 'Editează client' : 'Client nou'}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 md:space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Nume *</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-[#0F1117] border-gray-700 text-white text-sm h-9" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Email *</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" className="bg-[#0F1117] border-gray-700 text-white text-sm h-9" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Telefon</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-[#0F1117] border-gray-700 text-white text-sm h-9" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cui"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">CUI</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-[#0F1117] border-gray-700 text-white text-sm h-9" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Adresă</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="bg-[#0F1117] border-gray-700 text-white text-sm min-h-[80px]" rows={3} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Status *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value || 'active'}>
                    <FormControl>
                      <SelectTrigger className="bg-[#0F1117] border-gray-700 text-white text-sm h-9">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[#1A1F2C] border-gray-700 text-white">
                      <SelectItem value="active" className="text-sm">Client</SelectItem>
                      <SelectItem value="prospect" className="text-sm">Prospect</SelectItem>
                      <SelectItem value="inactive" className="text-sm">Inactiv</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <div className="flex flex-col md:flex-row justify-end gap-2 pt-2 md:pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="bg-[#0F1117] text-white border-gray-700 hover:bg-gray-800 text-sm h-9 w-full md:w-auto"
              >
                Anulează
              </Button>
              <Button
                type="submit"
                disabled={createClient.isPending || updateClient.isPending}
                className="bg-purple-600 hover:bg-purple-700 text-sm h-9 w-full md:w-auto"
              >
                {isEditing ? 'Salvează' : 'Adaugă'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
