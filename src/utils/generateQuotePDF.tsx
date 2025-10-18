import { Quote, QuoteItem } from '@/hooks/useQuotes';
import { formatDate } from './dateFormatters';
import { formatCurrency, formatNumber } from './numberFormatters';
import { Document, Page, Text, View, StyleSheet, pdf, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Roboto',
    fontSize: 10,
  },
  header: {
    marginBottom: 30,
    borderBottom: 2,
    borderBottomColor: '#9333ea',
    paddingBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9333ea',
    marginBottom: 10,
  },
  quoteNumber: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  dates: {
    fontSize: 10,
    color: '#666',
    marginTop: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    borderBottom: 1,
    borderBottomColor: '#e5e5e5',
    paddingBottom: 5,
  },
  clientInfo: {
    fontSize: 10,
    marginBottom: 3,
    color: '#444',
  },
  table: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#9333ea',
    padding: 8,
    color: 'white',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: 1,
    borderBottomColor: '#e5e5e5',
    padding: 8,
    minHeight: 30,
  },
  tableCol1: { width: '50%' },
  tableCol2: { width: '15%', textAlign: 'right' },
  tableCol3: { width: '15%', textAlign: 'right' },
  tableCol4: { width: '20%', textAlign: 'right' },
  totalsSection: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 250,
    marginBottom: 5,
    paddingVertical: 3,
  },
  totalLabel: {
    fontSize: 10,
    color: '#666',
  },
  totalValue: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  grandTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 250,
    borderTop: 2,
    borderTopColor: '#9333ea',
    paddingTop: 8,
    marginTop: 5,
  },
  grandTotalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#9333ea',
  },
  grandTotalValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#9333ea',
  },
  notesSection: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
  },
  notesTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
  },
  notesText: {
    fontSize: 9,
    color: '#444',
    lineHeight: 1.4,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 8,
    color: '#999',
    borderTop: 1,
    borderTopColor: '#e5e5e5',
    paddingTop: 10,
  },
});

const QuotePDFDocument = ({ quote, items }: { quote: Quote; items: QuoteItem[] }) => {
  const subtotalAfterDiscount = quote.subtotal - (quote.subtotal * quote.discount) / 100;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>OFERTĂ DE PREȚ</Text>
          <Text style={styles.quoteNumber}>Nr: {quote.quote_number}</Text>
          <Text style={styles.dates}>Data emiterii: {formatDate(quote.issue_date)}</Text>
          <Text style={styles.dates}>Valabil până la: {formatDate(quote.valid_until)}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Client</Text>
          <Text style={styles.clientInfo}>Nume: {quote.clients?.name}</Text>
          {quote.clients?.email && <Text style={styles.clientInfo}>Email: {quote.clients.email}</Text>}
          {quote.clients?.cui && <Text style={styles.clientInfo}>CUI: {quote.clients.cui}</Text>}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Articole</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableCol1}>Descriere</Text>
              <Text style={styles.tableCol2}>Cantitate</Text>
              <Text style={styles.tableCol3}>Preț unitar</Text>
              <Text style={styles.tableCol4}>Total</Text>
            </View>
            {items.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCol1}>{item.description}</Text>
                <Text style={styles.tableCol2}>{formatNumber(item.quantity)}</Text>
                <Text style={styles.tableCol3}>{formatCurrency(item.unit_price)}</Text>
                <Text style={styles.tableCol4}>{formatCurrency(item.total)}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.totalsSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text style={styles.totalValue}>{formatCurrency(quote.subtotal)}</Text>
          </View>
          {quote.discount > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Discount ({quote.discount}%):</Text>
              <Text style={styles.totalValue}>-{formatCurrency((quote.subtotal * quote.discount) / 100)}</Text>
            </View>
          )}
          {quote.discount > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal după discount:</Text>
              <Text style={styles.totalValue}>{formatCurrency(subtotalAfterDiscount)}</Text>
            </View>
          )}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>TVA (19%):</Text>
            <Text style={styles.totalValue}>{formatCurrency(quote.vat_amount)}</Text>
          </View>
          <View style={styles.grandTotal}>
            <Text style={styles.grandTotalLabel}>TOTAL:</Text>
            <Text style={styles.grandTotalValue}>{formatCurrency(quote.total)}</Text>
          </View>
        </View>

        {quote.terms && (
          <View style={styles.notesSection}>
            <Text style={styles.notesTitle}>Termeni și condiții:</Text>
            <Text style={styles.notesText}>{quote.terms}</Text>
          </View>
        )}

        {quote.notes && (
          <View style={styles.notesSection}>
            <Text style={styles.notesTitle}>Notițe:</Text>
            <Text style={styles.notesText}>{quote.notes}</Text>
          </View>
        )}

        <Text style={styles.footer}>
          Această ofertă este valabilă până la {formatDate(quote.valid_until)}
        </Text>
      </Page>
    </Document>
  );
};

export const generateQuotePDF = async (quote: Quote, items: QuoteItem[]) => {
  const blob = await pdf(<QuotePDFDocument quote={quote} items={items} />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${quote.quote_number}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
