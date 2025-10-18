import { z } from 'zod';

export const quoteItemSchema = z.object({
  description: z.string().min(1, 'Descrierea este obligatorie').max(500),
  quantity: z.number().min(0.01, 'Cantitatea trebuie să fie pozitivă'),
  unit_price: z.number().min(0, 'Prețul trebuie să fie pozitiv'),
});

export const quoteSchema = z.object({
  client_id: z.string().uuid('Selectați un client'),
  issue_date: z.date(),
  valid_until: z.date(),
  discount: z.number().min(0).max(100).default(0),
  terms: z.string().max(1000).optional(),
  notes: z.string().max(1000).optional(),
  items: z.array(quoteItemSchema).min(1, 'Adăugați cel puțin un articol'),
}).refine((data) => data.valid_until >= data.issue_date, {
  message: 'Data expirării trebuie să fie după data emiterii',
  path: ['valid_until'],
});

export type QuoteFormData = z.infer<typeof quoteSchema>;
export type QuoteItemFormData = z.infer<typeof quoteItemSchema>;
