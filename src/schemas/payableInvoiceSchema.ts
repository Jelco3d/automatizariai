import { z } from 'zod';

export const payableInvoiceSchema = z.object({
  supplier_name: z.string().min(1, 'Numele furnizorului este obligatoriu'),
  supplier_cui: z.string().optional(),
  invoice_number: z.string().min(1, 'Numărul facturii este obligatoriu'),
  issue_date: z.string().min(1, 'Data emiterii este obligatorie'),
  due_date: z.string().min(1, 'Data scadentă este obligatorie'),
  total: z.number().min(0, 'Totalul trebuie să fie pozitiv'),
  status: z.enum(['unpaid', 'paid', 'overdue']),
  payment_date: z.string().optional(),
  notes: z.string().optional(),
  pdf_file_path: z.string().optional(),
});

export type PayableInvoiceFormData = z.infer<typeof payableInvoiceSchema>;
