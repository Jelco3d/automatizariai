import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { InvoiceFormData } from '@/schemas/invoiceSchema';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { formatCurrency, formatNumber } from '@/utils/numberFormatters';

interface InvoiceItemsManagerProps {
  form: UseFormReturn<InvoiceFormData>;
}

export function InvoiceItemsManager({ form }: InvoiceItemsManagerProps) {
  const items = form.watch('items');

  const addItem = () => {
    const currentItems = form.getValues('items');
    form.setValue('items', [
      ...currentItems,
      { description: '', quantity: 1, unit_price: 0, vat_rate: 19 },
    ]);
  };

  const removeItem = (index: number) => {
    const currentItems = form.getValues('items');
    form.setValue('items', currentItems.filter((_, i) => i !== index));
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
  };

  const calculateVAT = () => {
    return items.reduce((sum, item) => {
      const itemTotal = item.quantity * item.unit_price;
      return sum + (itemTotal * item.vat_rate / 100);
    }, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateVAT();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Articole factură</h3>
        <Button
          type="button"
          onClick={addItem}
          variant="outline"
          size="sm"
          className="bg-purple-600 hover:bg-purple-700 text-white border-0"
        >
          <Plus className="h-4 w-4 mr-2" />
          Adaugă articol
        </Button>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-12 gap-2 items-start p-3 bg-[#0F1117] rounded-lg">
            <div className="col-span-5">
              <FormField
                control={form.control}
                name={`items.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Descriere</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-[#1A1F2C] border-gray-700 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-2">
              <FormField
                control={form.control}
                name={`items.${index}.quantity`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Cantitate</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        step="0.01"
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        className="bg-[#1A1F2C] border-gray-700 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-2">
              <FormField
                control={form.control}
                name={`items.${index}.unit_price`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Preț unitar</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        step="0.01"
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        className="bg-[#1A1F2C] border-gray-700 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-2">
              <FormField
                control={form.control}
                name={`items.${index}.vat_rate`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">TVA %</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        step="1"
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 19)}
                        className="bg-[#1A1F2C] border-gray-700 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-1 flex items-end justify-end">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeItem(index)}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 mt-6"
                disabled={items.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="col-span-12 text-right text-sm text-gray-400">
              Total articol: {formatCurrency(item.quantity * item.unit_price)}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#0F1117] p-4 rounded-lg space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Subtotal:</span>
          <span className="text-white font-medium">{formatCurrency(calculateSubtotal())}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">TVA:</span>
          <span className="text-white font-medium">{formatCurrency(calculateVAT())}</span>
        </div>
        <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-700">
          <span className="text-white">Total:</span>
          <span className="text-purple-400">{formatCurrency(calculateTotal())}</span>
        </div>
      </div>
    </div>
  );
}
