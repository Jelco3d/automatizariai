import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { InvoiceTemplateFormData } from "@/schemas/invoiceTemplateSchema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface InvoiceTemplateItemsManagerProps {
  form: UseFormReturn<InvoiceTemplateFormData>;
}

export function InvoiceTemplateItemsManager({ form }: InvoiceTemplateItemsManagerProps) {
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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label className="text-base font-semibold">Articole</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addItem}
        >
          <Plus className="h-4 w-4 mr-2" />
          Adaugă Articol
        </Button>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="p-4 border rounded-lg space-y-3 bg-card">
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium">Articol {index + 1}</span>
              {items.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(index)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              )}
            </div>

            <FormField
              control={form.control}
              name={`items.${index}.description`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descriere</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Descrierea serviciului/produsului" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-3">
              <FormField
                control={form.control}
                name={`items.${index}.quantity`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cantitate</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
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
                    <FormLabel>Preț Unitar</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`items.${index}.vat_rate`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>TVA (%)</FormLabel>
                    <Select
                      value={field.value?.toString()}
                      onValueChange={(value) => field.onChange(parseFloat(value))}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selectează TVA" />
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

            <div className="text-right text-sm text-muted-foreground">
              Total articol: {((item.quantity * item.unit_price) * (1 + item.vat_rate / 100)).toFixed(2)} RON
            </div>
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span className="font-medium">{calculateSubtotal().toFixed(2)} RON</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>TVA:</span>
            <span className="font-medium">{calculateVAT().toFixed(2)} RON</span>
          </div>
          <div className="flex justify-between text-base font-bold">
            <span>Total:</span>
            <span>{calculateTotal().toFixed(2)} RON</span>
          </div>
        </div>
      )}
    </div>
  );
}
