import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useInvoices } from '@/hooks/useInvoices';

interface InvoiceStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: {
    id: string;
    invoice_number: string;
    status: string;
  };
}

const statusOptions = [
  { value: 'draft', label: 'Ciornă', icon: '🟡' },
  { value: 'sent', label: 'Trimisă', icon: '🔵' },
  { value: 'paid', label: 'Plătită', icon: '🟢' },
  { value: 'overdue', label: 'Întârziată', icon: '🔴' },
  { value: 'cancelled', label: 'Anulată', icon: '⚪' },
];

export function InvoiceStatusDialog({ open, onOpenChange, invoice }: InvoiceStatusDialogProps) {
  const { updateInvoiceStatus } = useInvoices();
  const [selectedStatus, setSelectedStatus] = useState<'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'>(invoice.status as any);

  const handleSubmit = () => {
    updateInvoiceStatus.mutate(
      { id: invoice.id, status: selectedStatus },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A1F2C] border-amber-500/20 text-white">
        <DialogHeader>
          <DialogTitle>Schimbă status</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-sm text-gray-400">
            <p>Factură: <span className="text-white font-medium">{invoice.invoice_number}</span></p>
            <p>Status curent: <span className="text-white font-medium">{statusOptions.find(s => s.value === invoice.status)?.label}</span></p>
          </div>

          <RadioGroup 
            value={selectedStatus} 
            onValueChange={(value) => setSelectedStatus(value as typeof selectedStatus)} 
            className="space-y-2"
          >
            {statusOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-[#0F1117] transition-colors">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="flex items-center gap-2 cursor-pointer flex-1">
                  <span>{option.icon}</span>
                  <span>{option.label}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-gray-700 text-white hover:bg-gray-800"
          >
            Anulează
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={updateInvoiceStatus.isPending || selectedStatus === invoice.status}
            className="bg-amber-600 hover:bg-amber-700"
          >
            {updateInvoiceStatus.isPending ? 'Se salvează...' : 'Salvează'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}