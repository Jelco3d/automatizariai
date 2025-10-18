import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText, Pencil, Trash2, Download, RefreshCw } from "lucide-react";
import { Contract } from "@/hooks/useContracts";
import { StatusBadge } from "@/components/business/shared/StatusBadge";
import { formatDate } from "@/utils/dateFormatters";
import { formatCurrency } from "@/utils/numberFormatters";

interface ContractsTableProps {
  contracts: Contract[];
  onEdit: (contract: Contract) => void;
  onDelete: (id: string) => void;
  onDownloadPDF: (contract: Contract) => void;
  onView: (contract: Contract) => void;
  onChangeStatus: (contract: Contract) => void;
}

export function ContractsTable({
  contracts,
  onEdit,
  onDelete,
  onDownloadPDF,
  onView,
  onChangeStatus,
}: ContractsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nr. Contract</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Tip</TableHead>
            <TableHead>Data Început</TableHead>
            <TableHead>Data Încheiere</TableHead>
            <TableHead>Valoare</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Acțiuni</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contracts.map((contract) => (
            <TableRow key={contract.id}>
              <TableCell className="font-medium">{contract.contract_number}</TableCell>
              <TableCell>{contract.clients?.name}</TableCell>
              <TableCell>{contract.contract_type}</TableCell>
              <TableCell>{formatDate(contract.start_date)}</TableCell>
              <TableCell>{contract.end_date ? formatDate(contract.end_date) : '-'}</TableCell>
              <TableCell>{formatCurrency(contract.total_value)}</TableCell>
              <TableCell>
                <StatusBadge status={contract.status} type="contract" />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onView(contract)}
                    title="Vizualizează"
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onChangeStatus(contract)}
                    title="Schimbă Status"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDownloadPDF(contract)}
                    title="Descarcă PDF"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(contract)}
                    title="Editează"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(contract.id)}
                    title="Șterge"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}