import { z } from 'zod';

export const invoiceTemplateItemSchema = z.object({
  description: z.string().min(1, 'Descrierea este obligatorie').max(500),
  quantity: z.number().min(0.01, 'Cantitatea trebuie să fie pozitivă'),
  unit_price: z.number().min(0, 'Prețul trebuie să fie pozitiv'),
  vat_rate: z.number().default(19),
});

export const invoiceTemplateSchema = z.object({
  name: z.string().min(1, 'Numele template-ului este obligatoriu').max(200),
  description: z.string().max(1000).optional(),
  payment_terms: z.string().max(1000).optional(),
  notes: z.string().max(1000).optional(),
  company_name: z.string().min(1, 'Numele companiei este obligatoriu').max(200),
  company_cui: z.string().min(1, 'CUI-ul este obligatoriu').max(50),
  company_registration: z.string().min(1, 'Nr. înmatriculare este obligatoriu').max(100),
  company_address: z.string().min(1, 'Adresa este obligatorie').max(500),
  logo_url: z.string().optional(),
  items: z.array(invoiceTemplateItemSchema).min(1, 'Adăugați cel puțin un articol'),
});

export type InvoiceTemplateFormData = z.infer<typeof invoiceTemplateSchema>;
export type InvoiceTemplateItemFormData = z.infer<typeof invoiceTemplateItemSchema>;
