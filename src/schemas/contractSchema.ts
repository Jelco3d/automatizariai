import { z } from 'zod';

export const contractSchema = z.object({
  contract_type: z.string().min(1, 'Tipul contractului este obligatoriu'),
  client_id: z.string().uuid('Selectați un client'),
  start_date: z.date(),
  end_date: z.date().optional(),
  total_value: z.number().min(0, 'Valoarea trebuie să fie pozitivă'),
  terms: z.string().max(5000).optional(),
  clauses: z.string().max(5000).optional(),
}).refine((data) => !data.end_date || data.end_date >= data.start_date, {
  message: 'Data de încheiere trebuie să fie după data de început',
  path: ['end_date'],
});

export type ContractFormData = z.infer<typeof contractSchema>;

export const contractTypes = [
  'Servicii',
  'Mentenanță',
  'Consultanță',
  'Dezvoltare',
  'Abonament',
];
