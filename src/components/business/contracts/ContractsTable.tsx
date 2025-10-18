import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText, Pencil, Trash2, Download, RefreshCw, Share2 } from "lucide-react";
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
  onGenerateSignatureLink: (contract: Contract) => void;
}

export function ContractsTable({
  contracts,
  onEdit,
  onDelete,
  onDownloadPDF,
  onView,
  onChangeStatus,
  onGenerateSignatureLink,
}: ContractsTableProps) {
  return (
    <>
      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {contracts.map((contract) => (
          <div 
            key={contract.id} 
            className={`rounded-lg border p-4 ${
              contract.fully_signed_at 
                ? "bg-green-500/10 border-green-500/20" 
                : "bg-[#1A1F2C] border-purple-500/20"
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white text-sm">{contract.contract_number}</div>
                  <div className="text-xs text-gray-400 mt-1">{contract.clients?.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{contract.contract_type}</div>
                </div>
                <StatusBadge status={contract.status} type="contract" />
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-500">Început:</span>
                  <div className="text-gray-300 mt-0.5">{formatDate(contract.start_date)}</div>
                </div>
                <div>
                  <span className="text-gray-500">Încheiere:</span>
                  <div className="text-gray-300 mt-0.5">
                    {contract.end_date ? formatDate(contract.end_date) : '-'}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                <div className="font-semibold text-white">{formatCurrency(contract.total_value)}</div>
                <div className="flex gap-1 flex-wrap">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onView(contract)}
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 h-8 w-8 p-0"
                    title="Vezi"
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onChangeStatus(contract)}
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 h-8 w-8 p-0"
                    title="Status"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDownloadPDF(contract)}
                    className="text-green-400 hover:text-green-300 hover:bg-green-500/10 h-8 w-8 p-0"
                    title="PDF"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  {contract.generated_contract && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onGenerateSignatureLink(contract)}
                      className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 h-8 w-8 p-0"
                      title="Link"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(contract)}
                    className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10 h-8 w-8 p-0"
                    title="Editează"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(contract.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 w-8 p-0"
                    title="Șterge"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block rounded-md border">
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
              <TableRow 
                key={contract.id}
                className={contract.fully_signed_at ? "bg-green-500/10 hover:bg-green-500/20" : ""}
              >
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
                    {contract.generated_contract && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onGenerateSignatureLink(contract)}
                        title="Generează link pentru semnare"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    )}
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
    </>
  );
}