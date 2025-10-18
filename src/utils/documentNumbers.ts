export const generateInvoiceNumber = (count: number): string => {
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, '0');
  const sequence = String(count + 1).padStart(4, '0');
  return `INV-${year}-${month}-${sequence}`;
};

export const generateQuoteNumber = (count: number): string => {
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, '0');
  const sequence = String(count + 1).padStart(4, '0');
  return `OFF-${year}-${month}-${sequence}`;
};

export const generateContractNumber = (count: number): string => {
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, '0');
  const sequence = String(count + 1).padStart(4, '0');
  return `CNT-${year}-${month}-${sequence}`;
};
