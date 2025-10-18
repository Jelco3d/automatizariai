import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
      { description: '', quantity: 1, unit_price: 0, vat_rate: 21 },
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
    <div className="space-y-3 md:space-y-4">
      <div className="flex justify-between items-center gap-2">
        <h3 className="text-base md:text-lg font-semibold text-white">Articole</h3>
        <Button
          type="button"
          onClick={addItem}
          variant="outline"
          size="sm"
          className="bg-purple-600 hover:bg-purple-700 text-white border-0 text-xs md:text-sm h-8 md:h-9"
        >
          <Plus className="h-3.5 w-3.5 md:h-4 md:w-4 md:mr-2" />
          <span className="hidden md:inline">Adaugă</span>
        </Button>
      </div>

      <div className="space-y-2 md:space-y-3">
        {items.map((item, index) => (
          <div key={index} className="bg-[#0F1117] rounded-lg p-2.5 md:p-3 space-y-2.5 md:space-y-0">
            {/* Mobile: Stacked Layout */}
            <div className="md:hidden space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <FormField
                  control={form.control}
                  name={`items.${index}.description`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-xs">Descriere</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-[#1A1F2C] border-gray-700 text-white text-sm h-9" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(index)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10 mt-6 h-9 w-9 p-0"
                  disabled={items.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name={`items.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Cant.</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          step="0.01"
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          className="bg-[#1A1F2C] border-gray-700 text-white text-sm h-9"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name={`items.${index}.unit_price`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Preț</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          step="0.01"
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          className="bg-[#1A1F2C] border-gray-700 text-white text-sm h-9"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name={`items.${index}.vat_rate`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">TVA %</FormLabel>
                    <Select
                      value={field.value?.toString()}
                      onValueChange={(value) => field.onChange(parseFloat(value))}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-[#1A1F2C] border-gray-700 text-white text-sm h-9">
                          <SelectValue placeholder="TVA" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="21">21% TVA</SelectItem>
                        <SelectItem value="19">19% TVA</SelectItem>
                        <SelectItem value="9">9% TVA</SelectItem>
                        <SelectItem value="5">5% TVA</SelectItem>
                        <SelectItem value="0">Fără TVA</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="text-right text-xs text-gray-400 pt-1 border-t border-gray-700">
                Total: {formatCurrency(item.quantity * item.unit_price)}
              </div>
            </div>

            {/* Desktop: Grid Layout */}
            <div className="hidden md:grid grid-cols-12 gap-2 items-start">
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
                      <Select
                        value={field.value?.toString()}
                        onValueChange={(value) => field.onChange(parseFloat(value))}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-[#1A1F2C] border-gray-700 text-white">
                            <SelectValue placeholder="TVA" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="21">21% TVA (Standard)</SelectItem>
                          <SelectItem value="19">19% TVA</SelectItem>
                          <SelectItem value="9">9% TVA</SelectItem>
                          <SelectItem value="5">5% TVA</SelectItem>
                          <SelectItem value="0">Neplatitor TVA</SelectItem>
                        </SelectContent>
                      </Select>
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
          </div>
        ))}
      </div>

      <div className="bg-[#0F1117] p-3 md:p-4 rounded-lg space-y-1.5 md:space-y-2">
        <div className="flex justify-between text-xs md:text-sm">
          <span className="text-gray-400">Subtotal:</span>
          <span className="text-white font-medium">{formatCurrency(calculateSubtotal())}</span>
        </div>
        <div className="flex justify-between text-xs md:text-sm">
          <span className="text-gray-400">TVA:</span>
          <span className="text-white font-medium">{formatCurrency(calculateVAT())}</span>
        </div>
        <div className="flex justify-between text-base md:text-lg font-bold pt-1.5 md:pt-2 border-t border-gray-700">
          <span className="text-white">Total:</span>
          <span className="text-purple-400">{formatCurrency(calculateTotal())}</span>
        </div>
      </div>
    </div>
  );
}
