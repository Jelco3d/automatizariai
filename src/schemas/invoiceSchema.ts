import { z } from 'zod';

export const invoiceItemSchema = z.object({
  description: z.string().min(1, 'Descrierea este obligatorie').max(500),
  quantity: z.number().min(0.01, 'Cantitatea trebuie să fie pozitivă'),
  unit_price: z.number().min(0, 'Prețul trebuie să fie pozitiv'),
  vat_rate: z.number().default(21),
});

export const invoiceSchema = z.object({
  client_id: z.string().uuid('Selectați un client'),
  issue_date: z.date(),
  due_date: z.date(),
  payment_terms: z.string().max(1000).optional(),
  notes: z.string().max(1000).optional(),
  items: z.array(invoiceItemSchema).min(1, 'Adăugați cel puțin un articol'),
}).refine((data) => data.due_date >= data.issue_date, {
  message: 'Data scadenței trebuie să fie după data emiterii',
  path: ['due_date'],
});

export type InvoiceFormData = z.infer<typeof invoiceSchema>;
export type InvoiceItemFormData = z.infer<typeof invoiceItemSchema>;
