import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Contract } from "@/hooks/useContracts";

interface ContractStatusDialogProps {
  contract: Contract | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusChange: (contractId: string, status: Contract['status']) => void;
}

const statusOptions: { value: Contract['status']; label: string }[] = [
  { value: 'draft', label: 'Ciornă' },
  { value: 'pending', label: 'În așteptare' },
  { value: 'active', label: 'Activ' },
  { value: 'expired', label: 'Expirat' },
  { value: 'terminated', label: 'Reziliat' },
];

export function ContractStatusDialog({
  contract,
  open,
  onOpenChange,
  onStatusChange,
}: ContractStatusDialogProps) {
  const [selectedStatus, setSelectedStatus] = useState<Contract['status']>(
    contract?.status || 'draft'
  );

  const handleSubmit = () => {
    if (contract) {
      onStatusChange(contract.id, selectedStatus);
      onOpenChange(false);
    }
  };

  if (!contract) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A1F2C] text-white">
        <DialogHeader>
          <DialogTitle>Schimbă Status Contract</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-400 mb-2">
              Contract: {contract.contract_number}
            </p>
            <p className="text-sm text-gray-400 mb-4">
              Client: {contract.clients?.name}
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Status Nou</Label>
            <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as Contract['status'])}>
              <SelectTrigger className="bg-white text-gray-900 border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-gray-900">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Anulează
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Salvează
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}