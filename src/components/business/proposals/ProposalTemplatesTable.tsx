import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, FileCheck } from "lucide-react";
import { ProposalTemplate } from "@/hooks/useProposalTemplates";
import { DeleteDialog } from "@/components/business/shared/DeleteDialog";
import { formatCurrency } from "@/utils/numberFormatters";
import { format } from "date-fns";

interface ProposalTemplatesTableProps {
  templates: ProposalTemplate[];
  onDelete: (id: string) => void;
  onEdit: (template: ProposalTemplate) => void;
  onUseTemplate: (template: ProposalTemplate) => void;
}

export function ProposalTemplatesTable({ templates, onDelete, onEdit, onUseTemplate }: ProposalTemplatesTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<ProposalTemplate | null>(null);

  const handleDeleteClick = (template: ProposalTemplate) => {
    setSelectedTemplate(template);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedTemplate) {
      onDelete(selectedTemplate.id);
      setDeleteDialogOpen(false);
      setSelectedTemplate(null);
    }
  };

  if (templates.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        Nu există template-uri. Creează primul template!
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-purple-500/20">
              <TableHead className="text-gray-400">Nume</TableHead>
              <TableHead className="text-gray-400 hidden md:table-cell">Tip Business</TableHead>
              <TableHead className="text-gray-400 hidden lg:table-cell">Preț Implicit</TableHead>
              <TableHead className="text-gray-400 hidden xl:table-cell">Data Creării</TableHead>
              <TableHead className="text-gray-400 text-right">Acțiuni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {templates.map((template) => (
              <TableRow key={template.id} className="border-purple-500/20">
                <TableCell className="text-white font-medium">
                  <div>
                    <div>{template.name}</div>
                    {template.description && (
                      <div className="text-sm text-gray-400 mt-1">{template.description}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-white hidden md:table-cell">
                  {template.business_type || "-"}
                </TableCell>
                <TableCell className="text-white hidden lg:table-cell">
                  {template.default_price ? formatCurrency(template.default_price) : "-"}
                </TableCell>
                <TableCell className="text-gray-400 hidden xl:table-cell">
                  {format(new Date(template.created_at), "dd.MM.yyyy")}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUseTemplate(template)}
                      className="bg-green-600/20 border-green-500/20 hover:bg-green-600/30 text-green-400"
                    >
                      <FileCheck className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(template)}
                      className="bg-yellow-600/20 border-yellow-500/20 hover:bg-yellow-600/30 text-yellow-400"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClick(template)}
                      className="bg-red-600/20 border-red-500/20 hover:bg-red-600/30 text-red-400"
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

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Șterge Template"
        description={`Ești sigur că vrei să ștergi template-ul "${selectedTemplate?.name}"? Această acțiune nu poate fi anulată.`}
      />
    </>
  );
}
