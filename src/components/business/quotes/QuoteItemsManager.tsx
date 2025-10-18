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
    <div className="space-y-2 md:space-y-4">
      <div className="flex justify-between items-center gap-2">
        <Label className="text-white text-xs md:text-base">Articole</Label>
        <Button
          type="button"
          onClick={addItem}
          variant="outline"
          size="sm"
          className="bg-[#1A1F2C] md:bg-[#0F1117] border-gray-700 text-white hover:bg-[#0F1117] md:hover:bg-[#1A1F2C] text-xs h-7 md:h-9"
        >
          <Plus className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
          <span className="text-xs md:text-sm">Adaugă</span>
        </Button>
      </div>

      <div className="space-y-2 md:space-y-3">
        {items.map((item, index) => (
          <div key={index} className="bg-[#1A1F2C] md:bg-[#0F1117] rounded-lg border border-gray-700 p-2 md:p-4 space-y-2 md:space-y-0">
            {/* Mobile: Stacked Layout */}
            <div className="md:hidden space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <Label className="text-xs text-gray-400">Descriere</Label>
                  <Input
                    value={item.description}
                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                    placeholder="Descriere..."
                    className="bg-[#0F1117] border-gray-700 text-white mt-1 text-xs h-8"
                  />
                  {errors?.items?.[index]?.description && (
                    <p className="text-red-500 text-xs mt-0.5">{errors.items[index].description.message}</p>
                  )}
                </div>
                <Button
                  type="button"
                  onClick={() => removeItem(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-600 hover:bg-red-500/10 mt-4 h-8 w-8 p-0"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs text-gray-400">Cant.</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                    className="bg-[#0F1117] border-gray-700 text-white mt-1 text-xs h-8"
                  />
                </div>
                
                <div>
                  <Label className="text-xs text-gray-400">Preț</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={item.unit_price}
                    onChange={(e) => updateItem(index, 'unit_price', parseFloat(e.target.value) || 0)}
                    className="bg-[#0F1117] border-gray-700 text-white mt-1 text-xs h-8"
                  />
                </div>
              </div>

              <div className="text-right text-xs text-gray-400 pt-1 border-t border-gray-700">
                Total: <span className="text-white font-medium">{formatCurrency(item.quantity * item.unit_price)}</span>
              </div>
            </div>

            {/* Desktop: Grid Layout */}
            <div className="hidden md:grid grid-cols-12 gap-3">
              <div className="col-span-5">
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

              <div className="col-span-2">
                <Label className="text-xs text-gray-400">Cantitate</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                  className="bg-[#1A1F2C] border-gray-700 text-white mt-1"
                />
              </div>

              <div className="col-span-2">
                <Label className="text-xs text-gray-400">Preț unitar</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={item.unit_price}
                  onChange={(e) => updateItem(index, 'unit_price', parseFloat(e.target.value) || 0)}
                  className="bg-[#1A1F2C] border-gray-700 text-white mt-1"
                />
              </div>

              <div className="col-span-2 flex items-end">
                <div className="flex-1">
                  <Label className="text-xs text-gray-400">Total</Label>
                  <div className="text-white font-medium mt-1 text-sm md:text-base">
                    {formatCurrency(item.quantity * item.unit_price)}
                  </div>
                </div>
              </div>

              <div className="col-span-1 flex items-end justify-end">
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
          </div>
        ))}
      </div>

      {errors?.items?.message && (
        <p className="text-red-500 text-xs">{errors.items.message}</p>
      )}

      <div className="flex justify-end p-2 md:p-4 bg-[#1A1F2C] md:bg-[#0F1117] rounded-lg border border-gray-700">
        <div className="text-right">
          <Label className="text-gray-400 text-xs">Subtotal</Label>
          <div className="text-white font-bold text-base md:text-xl">{formatCurrency(calculateTotal())}</div>
        </div>
      </div>
    </div>
  );
}
