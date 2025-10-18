import { z } from 'zod';

export const proposalSchema = z.object({
  business_name: z.string().min(1, 'Numele businessului este obligatoriu').max(200),
  business_description: z.string().min(1, 'Descrierea este obligatorie').max(2000),
  automation_needs: z.string().min(1, 'Specificați ce doriți să automatizați').max(2000),
  timeframe: z.string().min(1, 'Intervalul de timp este obligatoriu').max(200),
  price: z.number().min(0, 'Prețul trebuie să fie pozitiv'),
});

export type ProposalFormData = z.infer<typeof proposalSchema>;
