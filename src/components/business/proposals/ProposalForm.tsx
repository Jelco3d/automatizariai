import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ProposalFormData, proposalSchema } from '@/schemas/proposalSchema';
import { supabase } from '@/integrations/supabase/client';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

// Normalize Romanian diacritics to correct comma-below forms
const normalizeRomanian = (text: string): string => {
  return text
    .replace(/\u015F/g, "ș") // ş → ș (s with comma below)
    .replace(/\u015E/g, "Ș") // Ş → Ș
    .replace(/\u0163/g, "ț") // ţ → ț (t with comma below)
    .replace(/\u0162/g, "Ț") // Ţ → Ț
    .normalize("NFC");
};

interface ProposalFormProps {
  onSubmit: (data: ProposalFormData & { generated_proposal?: string }) => void;
  initialData?: ProposalFormData;
  isSubmitting?: boolean;
}

export function ProposalForm({ onSubmit, initialData, isSubmitting }: ProposalFormProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProposalFormData>({
    resolver: zodResolver(proposalSchema),
    defaultValues: initialData || {
      business_name: '',
      business_description: '',
      automation_needs: '',
      timeframe: '',
      price: 0,
    },
  });

  const handleFormSubmit = async (data: ProposalFormData) => {
    setIsGenerating(true);
    try {
      // Generate AI proposal
      const { data: functionData, error: functionError } = await supabase.functions.invoke('generate-proposal', {
        body: {
          businessName: data.business_name,
          businessDescription: data.business_description,
          automationNeeds: data.automation_needs,
          timeframe: data.timeframe,
          price: data.price,
        }
      });

      if (functionError) throw functionError;

      // Normalize and pass the generated proposal along with form data
      const normalizedProposal = functionData.generatedProposal 
        ? normalizeRomanian(functionData.generatedProposal) 
        : undefined;
      
      onSubmit({
        ...data,
        generated_proposal: normalizedProposal,
      });
    } catch (error) {
      console.error('Error generating proposal:', error);
      // Still submit without generated proposal if AI fails
      onSubmit(data);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <Label className="text-white">Nume Business *</Label>
        <Input
          {...register('business_name')}
          placeholder="Numele companiei..."
          className="bg-[#0F1117] border-gray-700 text-white mt-1"
        />
        {errors.business_name && (
          <p className="text-red-500 text-sm mt-1">{errors.business_name.message}</p>
        )}
      </div>

      <div>
        <Label className="text-white">Descriere Business *</Label>
        <Textarea
          {...register('business_description')}
          placeholder="Descrieți businessul..."
          className="bg-[#0F1117] border-gray-700 text-white mt-1 min-h-[100px]"
        />
        {errors.business_description && (
          <p className="text-red-500 text-sm mt-1">{errors.business_description.message}</p>
        )}
      </div>

      <div>
        <Label className="text-white">Ce doresc să automatizeze *</Label>
        <Textarea
          {...register('automation_needs')}
          placeholder="Specificați procesele care trebuie automatizate..."
          className="bg-[#0F1117] border-gray-700 text-white mt-1 min-h-[120px]"
        />
        {errors.automation_needs && (
          <p className="text-red-500 text-sm mt-1">{errors.automation_needs.message}</p>
        )}
      </div>

      <div>
        <Label className="text-white">Timeframe Implementare *</Label>
        <Input
          {...register('timeframe')}
          placeholder="Ex: 2-3 luni, 4-6 săptămâni..."
          className="bg-[#0F1117] border-gray-700 text-white mt-1"
        />
        {errors.timeframe && (
          <p className="text-red-500 text-sm mt-1">{errors.timeframe.message}</p>
        )}
      </div>

      <div>
        <Label className="text-white">Preț (RON) *</Label>
        <Input
          type="number"
          step="0.01"
          {...register('price', {
            setValueAs: (v) => v === '' ? 0 : parseFloat(v),
          })}
          placeholder="0.00"
          className="bg-[#0F1117] border-gray-700 text-white mt-1"
        />
        {errors.price && (
          <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
        )}
      </div>

      <div className="flex gap-3 justify-end pt-4">
        <Button
          type="submit"
          disabled={isSubmitting || isGenerating}
          className="bg-purple-600 hover:bg-purple-700 w-full md:w-auto"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Generez propunerea...
            </>
          ) : isSubmitting ? (
            'Se salvează...'
          ) : initialData ? (
            'Actualizează Propunerea'
          ) : (
            'Creează Propunerea'
          )}
        </Button>
      </div>
    </form>
  );
}
