import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { proposalTemplateSchema, ProposalTemplateFormData } from "@/schemas/proposalTemplateSchema";

interface ProposalTemplateFormProps {
  onSubmit: (data: ProposalTemplateFormData) => void;
  initialData?: ProposalTemplateFormData;
  isSubmitting: boolean;
}

export function ProposalTemplateForm({ onSubmit, initialData, isSubmitting }: ProposalTemplateFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProposalTemplateFormData>({
    resolver: zodResolver(proposalTemplateSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      business_type: "",
      automation_needs_template: "",
      timeframe_template: "",
      default_price: 0,
      proposal_structure: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Nume Template *</Label>
        <Input
          id="name"
          {...register("name")}
          className="bg-[#1A1F2C] border-purple-500/20 text-white"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description">Descriere</Label>
        <Textarea
          id="description"
          {...register("description")}
          className="bg-[#1A1F2C] border-purple-500/20 text-white min-h-[80px]"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="business_type">Tip Business</Label>
        <Input
          id="business_type"
          {...register("business_type")}
          className="bg-[#1A1F2C] border-purple-500/20 text-white"
          placeholder="ex: E-commerce, SaaS, Consultanță"
        />
        {errors.business_type && (
          <p className="text-red-500 text-sm mt-1">{errors.business_type.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="automation_needs_template">Template Nevoi Automatizare</Label>
        <Textarea
          id="automation_needs_template"
          {...register("automation_needs_template")}
          className="bg-[#1A1F2C] border-purple-500/20 text-white min-h-[100px]"
          placeholder="Text pre-completat pentru secțiunea de automatizări..."
        />
        {errors.automation_needs_template && (
          <p className="text-red-500 text-sm mt-1">{errors.automation_needs_template.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="timeframe_template">Template Interval Timp</Label>
        <Input
          id="timeframe_template"
          {...register("timeframe_template")}
          className="bg-[#1A1F2C] border-purple-500/20 text-white"
          placeholder="ex: 2-3 luni"
        />
        {errors.timeframe_template && (
          <p className="text-red-500 text-sm mt-1">{errors.timeframe_template.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="default_price">Preț Implicit (RON)</Label>
        <Input
          id="default_price"
          type="number"
          step="0.01"
          {...register("default_price", { valueAsNumber: true })}
          className="bg-[#1A1F2C] border-purple-500/20 text-white"
        />
        {errors.default_price && (
          <p className="text-red-500 text-sm mt-1">{errors.default_price.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="proposal_structure">Structură Propunere</Label>
        <Textarea
          id="proposal_structure"
          {...register("proposal_structure")}
          className="bg-[#1A1F2C] border-purple-500/20 text-white min-h-[150px]"
          placeholder="Structură completă a propunerii cu secțiuni, subsecțiuni..."
        />
        {errors.proposal_structure && (
          <p className="text-red-500 text-sm mt-1">{errors.proposal_structure.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-purple-600 hover:bg-purple-700"
        >
          {isSubmitting ? "Se salvează..." : "Salvează Template"}
        </Button>
      </div>
    </form>
  );
}
