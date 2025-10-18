import { z } from 'zod';

export const clientSchema = z.object({
  name: z.string().min(1, 'Numele este obligatoriu').max(100, 'Numele este prea lung'),
  email: z.string().email('Email invalid').max(255, 'Email-ul este prea lung'),
  phone: z.string().optional(),
  cui: z.string().optional(),
  address: z.string().max(500, 'Adresa este prea lungă').optional(),
  status: z.enum(['active', 'prospect', 'inactive']).default('active'),
});

export type ClientFormData = z.infer<typeof clientSchema>;
