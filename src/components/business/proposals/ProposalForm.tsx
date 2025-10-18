import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ProposalFormData, proposalSchema } from '@/schemas/proposalSchema';

interface ProposalFormProps {
  onSubmit: (data: ProposalFormData) => void;
  initialData?: ProposalFormData;
  isSubmitting?: boolean;
}

export function ProposalForm({ onSubmit, initialData, isSubmitting }: ProposalFormProps) {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          disabled={isSubmitting}
          className="bg-purple-600 hover:bg-purple-700 w-full md:w-auto"
        >
          {isSubmitting ? 'Se salvează...' : initialData ? 'Actualizează Propunerea' : 'Creează Propunerea'}
        </Button>
      </div>
    </form>
  );
}
