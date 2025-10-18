import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clientSchema, type ClientFormData } from '@/schemas/clientSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useClients } from '@/hooks/useClients';
import type { Tables } from '@/integrations/supabase/types';

type Client = Tables<'clients'>;

interface ClientFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client?: Client | null;
}

export function ClientForm({ open, onOpenChange, client }: ClientFormProps) {
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
    } : {
      name: '',
      email: '',
      phone: undefined,
      cui: undefined,
      address: undefined,
    },
  });

  const onSubmit = async (data: ClientFormData) => {
    const clientData = {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      cui: data.cui || null,
      address: data.address || null,
    };

    if (isEditing && client) {
      await updateClient.mutateAsync({ id: client.id, ...clientData });
    } else {
      await createClient.mutateAsync(clientData);
    }
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A1F2C] border-purple-500/20 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Editează client' : 'Client nou'}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nume *</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-[#0F1117] border-gray-700 text-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" className="bg-[#0F1117] border-gray-700 text-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefon</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-[#0F1117] border-gray-700 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cui"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CUI</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-[#0F1117] border-gray-700 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresă</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="bg-[#0F1117] border-gray-700 text-white" rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="bg-[#0F1117] text-white border-gray-700 hover:bg-gray-800"
              >
                Anulează
              </Button>
              <Button
                type="submit"
                disabled={createClient.isPending || updateClient.isPending}
                className="bg-purple-600 hover:bg-purple-700"
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
