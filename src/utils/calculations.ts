export const calculateLineTotal = (quantity: number, unitPrice: number): number => {
  return quantity * unitPrice;
};

export const calculateVATAmount = (subtotal: number, vatRate: number = 19): number => {
  return subtotal * (vatRate / 100);
};

export const calculateDiscountAmount = (subtotal: number, discount: number): number => {
  return subtotal * (discount / 100);
};

export const calculateInvoiceTotal = (items: Array<{ quantity: number; unit_price: number; vat_rate: number }>): {
  subtotal: number;
  vatAmount: number;
  total: number;
} => {
  const subtotal = items.reduce((sum, item) => sum + calculateLineTotal(item.quantity, item.unit_price), 0);
  const vatAmount = items.reduce((sum, item) => sum + calculateVATAmount(item.quantity * item.unit_price, item.vat_rate), 0);
  const total = subtotal + vatAmount;
  
  return { subtotal, vatAmount, total };
};

export const calculateQuoteTotal = (items: Array<{ quantity: number; unit_price: number }>, discount: number = 0): {
  subtotal: number;
  discountAmount: number;
  vatAmount: number;
  total: number;
} => {
  const subtotal = items.reduce((sum, item) => sum + calculateLineTotal(item.quantity, item.unit_price), 0);
  const discountAmount = calculateDiscountAmount(subtotal, discount);
  const subtotalAfterDiscount = subtotal - discountAmount;
  const vatAmount = calculateVATAmount(subtotalAfterDiscount);
  const total = subtotalAfterDiscount + vatAmount;
  
  return { subtotal, discountAmount, vatAmount, total };
};
