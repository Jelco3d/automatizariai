import { z } from 'zod';

export const proposalTemplateSchema = z.object({
  name: z.string().min(1, 'Numele template-ului este obligatoriu').max(200),
  description: z.string().max(1000).optional(),
  business_type: z.string().max(200).optional(),
  automation_needs_template: z.string().max(2000).optional(),
  timeframe_template: z.string().max(200).optional(),
  default_price: z.number().min(0).optional(),
  proposal_structure: z.string().max(5000).optional(),
  code_snippets: z.string().max(50000).optional(),
});

export type ProposalTemplateFormData = z.infer<typeof proposalTemplateSchema>;
