import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, FileText } from "lucide-react";
import { format } from "date-fns";
import { useInvoiceTemplates, useDeleteInvoiceTemplate } from "@/hooks/useInvoiceTemplates";
import { InvoiceTemplateForm } from "./InvoiceTemplateForm";
import { DeleteDialog } from "../shared/DeleteDialog";

interface InvoiceTemplatesTableProps {
  onUseTemplate?: (template: any) => void;
}

export function InvoiceTemplatesTable({ onUseTemplate }: InvoiceTemplatesTableProps) {
  const { data: templates, isLoading } = useInvoiceTemplates();
  const deleteTemplate = useDeleteInvoiceTemplate();
  const [editTemplate, setEditTemplate] = useState<any>(null);
  const [deleteTemplateId, setDeleteTemplateId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Se încarcă template-urile...
      </div>
    );
  }

  if (!templates || templates.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Nu există template-uri create. Creează primul template!
      </div>
    );
  }

  const handleDelete = async () => {
    if (deleteTemplateId) {
      await deleteTemplate.mutateAsync(deleteTemplateId);
      setDeleteTemplateId(null);
    }
  };

  return (
    <>
      <div className="rounded-md border border-purple-500/20">
        <Table>
          <TableHeader>
            <TableRow className="border-purple-500/20 hover:bg-purple-500/5">
              <TableHead className="text-purple-300">Nume</TableHead>
              <TableHead className="text-purple-300">Descriere</TableHead>
              <TableHead className="text-purple-300 text-center">Articole</TableHead>
              <TableHead className="text-purple-300">Data Creării</TableHead>
              <TableHead className="text-purple-300 text-right">Acțiuni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {templates.map((template) => (
              <TableRow
                key={template.id}
                className="border-purple-500/20 hover:bg-purple-500/5"
              >
                <TableCell className="font-medium text-white">
                  {template.name}
                </TableCell>
                <TableCell className="text-gray-300 max-w-md truncate">
                  {template.description || '-'}
                </TableCell>
                <TableCell className="text-center text-gray-300">
                  {template.items?.length || 0}
                </TableCell>
                <TableCell className="text-gray-300">
                  {format(new Date(template.created_at), "dd.MM.yyyy")}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {onUseTemplate && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onUseTemplate(template)}
                        className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditTemplate(template)}
                      className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteTemplateId(template.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
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

      <InvoiceTemplateForm
        open={!!editTemplate}
        onOpenChange={(open) => !open && setEditTemplate(null)}
        template={editTemplate}
      />

      <DeleteDialog
        open={!!deleteTemplateId}
        onOpenChange={(open) => !open && setDeleteTemplateId(null)}
        onConfirm={handleDelete}
        title="Șterge Template"
        description="Sigur vrei să ștergi acest template? Această acțiune nu poate fi anulată."
      />
    </>
  );
}
