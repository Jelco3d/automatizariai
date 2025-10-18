import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { QuoteFormData, quoteSchema } from '@/schemas/quoteSchema';
import { ClientSelector } from '@/components/business/shared/ClientSelector';
import { QuoteItemsManager } from './QuoteItemsManager';
import { Card } from '@/components/ui/card';

interface QuoteFormProps {
  onSubmit: (data: QuoteFormData) => void;
  initialData?: QuoteFormData;
  isSubmitting?: boolean;
}

export function QuoteForm({ onSubmit, initialData, isSubmitting }: QuoteFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: initialData || {
      client_id: '',
      issue_date: new Date(),
      valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      discount: 0,
      items: [{ description: '', quantity: 1, unit_price: 0 }],
    },
  });

  const items = watch('items');
  const clientId = watch('client_id');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 md:space-y-6">
      <Card className="bg-[#1A1F2C] border-purple-500/20 p-3 md:p-6">
        <h3 className="text-base md:text-xl font-semibold text-white mb-3 md:mb-4">Informații Client</h3>
        <div className="space-y-3 md:space-y-4">
          <div>
            <Label className="text-white text-xs md:text-sm">Client *</Label>
            <ClientSelector
              value={clientId}
              onChange={(value) => setValue('client_id', value)}
            />
            {errors.client_id && (
              <p className="text-red-500 text-xs md:text-sm mt-1">{errors.client_id.message}</p>
            )}
          </div>
        </div>
      </Card>

      <Card className="bg-[#1A1F2C] border-purple-500/20 p-3 md:p-6">
        <h3 className="text-base md:text-xl font-semibold text-white mb-3 md:mb-4">Detalii Ofertă</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-4">
          <div>
            <Label className="text-white text-xs md:text-sm">Data emiterii *</Label>
            <Input
              type="date"
              {...register('issue_date', {
                setValueAs: (v) => v ? new Date(v) : undefined,
              })}
              defaultValue={initialData?.issue_date ? new Date(initialData.issue_date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
              className="bg-[#0F1117] border-gray-700 text-white mt-1 text-sm h-9 md:h-10"
            />
            {errors.issue_date && (
              <p className="text-red-500 text-xs md:text-sm mt-1">{errors.issue_date.message}</p>
            )}
          </div>

          <div>
            <Label className="text-white text-xs md:text-sm">Valabilă până la *</Label>
            <Input
              type="date"
              {...register('valid_until', {
                setValueAs: (v) => v ? new Date(v) : undefined,
              })}
              defaultValue={initialData?.valid_until ? new Date(initialData.valid_until).toISOString().split('T')[0] : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
              className="bg-[#0F1117] border-gray-700 text-white mt-1 text-sm h-9 md:h-10"
            />
            {errors.valid_until && (
              <p className="text-red-500 text-xs md:text-sm mt-1">{errors.valid_until.message}</p>
            )}
          </div>

          <div>
            <Label className="text-white text-xs md:text-sm">Discount (%)</Label>
            <Input
              type="number"
              step="0.01"
              {...register('discount', {
                setValueAs: (v) => v === '' ? 0 : parseFloat(v),
              })}
              className="bg-[#0F1117] border-gray-700 text-white mt-1 text-sm h-9 md:h-10"
            />
            {errors.discount && (
              <p className="text-red-500 text-xs md:text-sm mt-1">{errors.discount.message}</p>
            )}
          </div>
        </div>
      </Card>

      <Card className="bg-[#1A1F2C] border-purple-500/20 p-3 md:p-6">
        <QuoteItemsManager
          items={items}
          onChange={(newItems) => setValue('items', newItems)}
          errors={errors}
        />
      </Card>

      <Card className="bg-[#1A1F2C] border-purple-500/20 p-3 md:p-6">
        <h3 className="text-base md:text-xl font-semibold text-white mb-3 md:mb-4">Termeni și Notițe</h3>
        <div className="space-y-3 md:space-y-4">
          <div>
            <Label className="text-white text-xs md:text-sm">Termeni și condiții</Label>
            <Textarea
              {...register('terms')}
              placeholder="Termeni și condiții..."
              className="bg-[#0F1117] border-gray-700 text-white mt-1 min-h-[80px] md:min-h-[100px] text-sm"
            />
          </div>

          <div>
            <Label className="text-white text-xs md:text-sm">Notițe</Label>
            <Textarea
              {...register('notes')}
              placeholder="Notițe adiționale..."
              className="bg-[#0F1117] border-gray-700 text-white mt-1 min-h-[80px] md:min-h-[100px] text-sm"
            />
          </div>
        </div>
      </Card>

      <div className="flex gap-3 justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-purple-600 hover:bg-purple-700 w-full md:w-auto text-sm h-9 md:h-10"
        >
          {isSubmitting ? 'Se salvează...' : initialData ? 'Actualizează' : 'Creează'}
        </Button>
      </div>
    </form>
  );
}
