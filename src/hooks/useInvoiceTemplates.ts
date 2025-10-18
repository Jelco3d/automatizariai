import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { InvoiceTemplateFormData } from "@/schemas/invoiceTemplateSchema";

export const useInvoiceTemplates = () => {
  return useQuery({
    queryKey: ["invoice-templates"],
    queryFn: async () => {
      const { data: templates, error: templatesError } = await supabase
        .from("invoice_templates")
        .select("*")
        .order("created_at", { ascending: false });

      if (templatesError) throw templatesError;

      const templatesWithItems = await Promise.all(
        templates.map(async (template) => {
          const { data: items, error: itemsError } = await supabase
            .from("invoice_template_items")
            .select("*")
            .eq("template_id", template.id);

          if (itemsError) throw itemsError;

          return {
            ...template,
            items: items || [],
          };
        })
      );

      return templatesWithItems;
    },
  });
};

export const useCreateInvoiceTemplate = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: InvoiceTemplateFormData) => {
      const { data: template, error: templateError } = await supabase
        .from("invoice_templates")
        .insert({
          name: data.name,
          description: data.description,
          payment_terms: data.payment_terms,
          notes: data.notes,
        })
        .select()
        .single();

      if (templateError) throw templateError;

      const itemsToInsert = data.items.map((item) => ({
        template_id: template.id,
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unit_price,
        vat_rate: item.vat_rate,
      }));

      const { error: itemsError } = await supabase
        .from("invoice_template_items")
        .insert(itemsToInsert);

      if (itemsError) throw itemsError;

      return template;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoice-templates"] });
      toast({
        title: "Success",
        description: "Template creat cu succes!",
      });
    },
    onError: (error) => {
      toast({
        title: "Eroare",
        description: "Nu s-a putut crea template-ul: " + error.message,
        variant: "destructive",
      });
    },
  });
};

export const useUpdateInvoiceTemplate = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: InvoiceTemplateFormData }) => {
      const { error: templateError } = await supabase
        .from("invoice_templates")
        .update({
          name: data.name,
          description: data.description,
          payment_terms: data.payment_terms,
          notes: data.notes,
        })
        .eq("id", id);

      if (templateError) throw templateError;

      // Delete existing items
      const { error: deleteError } = await supabase
        .from("invoice_template_items")
        .delete()
        .eq("template_id", id);

      if (deleteError) throw deleteError;

      // Insert new items
      const itemsToInsert = data.items.map((item) => ({
        template_id: id,
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unit_price,
        vat_rate: item.vat_rate,
      }));

      const { error: itemsError } = await supabase
        .from("invoice_template_items")
        .insert(itemsToInsert);

      if (itemsError) throw itemsError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoice-templates"] });
      toast({
        title: "Success",
        description: "Template actualizat cu succes!",
      });
    },
    onError: (error) => {
      toast({
        title: "Eroare",
        description: "Nu s-a putut actualiza template-ul: " + error.message,
        variant: "destructive",
      });
    },
  });
};

export const useDeleteInvoiceTemplate = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("invoice_templates")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoice-templates"] });
      toast({
        title: "Success",
        description: "Template șters cu succes!",
      });
    },
    onError: (error) => {
      toast({
        title: "Eroare",
        description: "Nu s-a putut șterge template-ul: " + error.message,
        variant: "destructive",
      });
    },
  });
};
