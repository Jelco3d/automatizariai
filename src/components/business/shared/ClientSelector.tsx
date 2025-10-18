import { useClients } from '@/hooks/useClients';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormControl } from '@/components/ui/form';

interface ClientSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function ClientSelector({ value, onChange }: ClientSelectorProps) {
  const { clients, isLoading } = useClients();

  return (
    <Select value={value} onValueChange={onChange}>
      <FormControl>
        <SelectTrigger className="bg-[#0F1117] border-gray-700 text-white">
          <SelectValue placeholder="Selectează client" />
        </SelectTrigger>
      </FormControl>
      <SelectContent className="bg-[#1A1F2C] border-gray-700 text-white">
        {isLoading ? (
          <SelectItem value="loading" disabled>Se încarcă...</SelectItem>
        ) : clients.length === 0 ? (
          <SelectItem value="empty" disabled>Nu există clienți</SelectItem>
        ) : (
          clients.map((client) => (
            <SelectItem key={client.id} value={client.id}>
              {client.name} - {client.email}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
}
