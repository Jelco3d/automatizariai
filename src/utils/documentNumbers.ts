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

export const generateDocumentNumber = async (type: 'INVOICE' | 'QUOTE' | 'CONTRACT'): Promise<string> => {
  const { supabase } = await import('@/integrations/supabase/client');
  
  const tableMap: Record<'INVOICE' | 'QUOTE' | 'CONTRACT', 'invoices' | 'quotes' | 'contracts'> = {
    INVOICE: 'invoices',
    QUOTE: 'quotes',
    CONTRACT: 'contracts',
  };
  
  const generatorMap = {
    INVOICE: generateInvoiceNumber,
    QUOTE: generateQuoteNumber,
    CONTRACT: generateContractNumber,
  };
  
  const table = tableMap[type];
  const generator = generatorMap[type];
  
  const { count, error } = await supabase
    .from(table)
    .select('*', { count: 'exact', head: true });
    
  if (error) throw error;
  
  return generator(count || 0);
};
