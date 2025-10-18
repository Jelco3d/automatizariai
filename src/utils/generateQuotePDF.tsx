import { Quote, QuoteItem } from '@/hooks/useQuotes';
import { formatDate } from './dateFormatters';
import { formatCurrency, formatNumber } from './numberFormatters';

export const generateQuotePDF = async (quote: Quote, items: QuoteItem[]) => {
  // For now, return a simple implementation that can be enhanced later with @react-pdf/renderer
  const content = `
    Ofertă: ${quote.quote_number}
    Data: ${formatDate(quote.issue_date)}
    Valabil până: ${formatDate(quote.valid_until)}
    
    Client: ${quote.clients?.name}
    ${quote.clients?.email ? `Email: ${quote.clients.email}` : ''}
    ${quote.clients?.cui ? `CUI: ${quote.clients.cui}` : ''}
    
    Articole:
    ${items.map((item, index) => `
    ${index + 1}. ${item.description}
       Cantitate: ${formatNumber(item.quantity)} x ${formatCurrency(item.unit_price)} = ${formatCurrency(item.total)}
    `).join('\n')}
    
    Subtotal: ${formatCurrency(quote.subtotal)}
    ${quote.discount > 0 ? `Discount (${quote.discount}%): -${formatCurrency((quote.subtotal * quote.discount) / 100)}` : ''}
    TVA (19%): ${formatCurrency(quote.vat_amount)}
    
    TOTAL: ${formatCurrency(quote.total)}
    
    ${quote.terms ? `\nTermeni și condiții:\n${quote.terms}` : ''}
    ${quote.notes ? `\nNotițe:\n${quote.notes}` : ''}
  `;

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${quote.quote_number}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
