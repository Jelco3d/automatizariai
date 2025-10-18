import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Plus } from 'lucide-react';
import { QuoteItemFormData } from '@/schemas/quoteSchema';
import { formatCurrency } from '@/utils/numberFormatters';

interface QuoteItemsManagerProps {
  items: QuoteItemFormData[];
  onChange: (items: QuoteItemFormData[]) => void;
  errors?: any;
}

export function QuoteItemsManager({ items, onChange, errors }: QuoteItemsManagerProps) {
  const addItem = () => {
    onChange([...items, { description: '', quantity: 1, unit_price: 0 }]);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof QuoteItemFormData, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    onChange(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label className="text-white">Articole</Label>
        <Button
          type="button"
          onClick={addItem}
          variant="outline"
          size="sm"
          className="bg-[#0F1117] border-gray-700 text-white hover:bg-[#1A1F2C]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Adaugă articol
        </Button>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 bg-[#0F1117] rounded-lg border border-gray-700">
            <div className="md:col-span-5">
              <Label className="text-xs text-gray-400">Descriere</Label>
              <Input
                value={item.description}
                onChange={(e) => updateItem(index, 'description', e.target.value)}
                placeholder="Descriere serviciu/produs"
                className="bg-[#1A1F2C] border-gray-700 text-white mt-1"
              />
              {errors?.items?.[index]?.description && (
                <p className="text-red-500 text-xs mt-1">{errors.items[index].description.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <Label className="text-xs text-gray-400">Cantitate</Label>
              <Input
                type="number"
                step="0.01"
                value={item.quantity}
                onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                className="bg-[#1A1F2C] border-gray-700 text-white mt-1"
              />
            </div>

            <div className="md:col-span-2">
              <Label className="text-xs text-gray-400">Preț unitar</Label>
              <Input
                type="number"
                step="0.01"
                value={item.unit_price}
                onChange={(e) => updateItem(index, 'unit_price', parseFloat(e.target.value) || 0)}
                className="bg-[#1A1F2C] border-gray-700 text-white mt-1"
              />
            </div>

            <div className="md:col-span-2 flex items-end">
              <div className="flex-1">
                <Label className="text-xs text-gray-400">Total</Label>
                <div className="text-white font-medium mt-1 text-sm md:text-base">
                  {formatCurrency(item.quantity * item.unit_price)}
                </div>
              </div>
            </div>

            <div className="md:col-span-1 flex items-end justify-end">
              <Button
                type="button"
                onClick={() => removeItem(index)}
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {errors?.items?.message && (
        <p className="text-red-500 text-sm">{errors.items.message}</p>
      )}

      <div className="flex justify-end p-4 bg-[#0F1117] rounded-lg border border-gray-700">
        <div className="text-right">
          <Label className="text-gray-400 text-sm">Subtotal</Label>
          <div className="text-white font-bold text-xl">{formatCurrency(calculateTotal())}</div>
        </div>
      </div>
    </div>
  );
}
