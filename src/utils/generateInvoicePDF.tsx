import { Document, Page, Text, View, StyleSheet, Image, pdf } from '@react-pdf/renderer';
import { formatDate } from './dateFormatters';
import { formatCurrency } from './numberFormatters';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
  },
  invoiceInfo: {
    textAlign: 'right',
  },
  invoiceNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  column: {
    width: '48%',
  },
  text: {
    marginBottom: 3,
  },
  bold: {
    fontWeight: 'bold',
  },
  table: {
    marginTop: 15,
    marginBottom: 15,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 5,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  colDesc: { width: '40%' },
  colQty: { width: '15%', textAlign: 'center' },
  colPrice: { width: '15%', textAlign: 'right' },
  colVat: { width: '15%', textAlign: 'center' },
  colTotal: { width: '15%', textAlign: 'right' },
  totalsSection: {
    marginTop: 15,
    alignItems: 'flex-end',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
    marginBottom: 5,
  },
  grandTotal: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#000',
  },
  footer: {
    marginTop: 30,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

interface InvoiceData {
  invoice_number: string;
  issue_date: string;
  due_date: string;
  payment_terms?: string;
  notes?: string;
  subtotal: number;
  vat_amount: number;
  total: number;
  client?: {
    name: string;
    cui?: string;
    address?: string;
    email: string;
    phone?: string;
  };
  items: Array<{
    description: string;
    quantity: number;
    unit_price: number;
    vat_rate: number;
    total: number;
  }>;
}

interface TemplateData {
  company_name?: string;
  company_cui?: string;
  company_registration?: string;
  company_address?: string;
  company_city?: string;
  bank_name?: string;
  bank_account?: string;
  logo_url?: string;
}

const InvoicePDF = ({ invoice, template }: { invoice: InvoiceData; template?: TemplateData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          {template?.logo_url && (
            <Image src={template.logo_url} style={styles.logo} />
          )}
        </View>
        <View style={styles.invoiceInfo}>
          <Text style={styles.invoiceNumber}>FACTURĂ {invoice.invoice_number}</Text>
          <Text>Data emiterii: {formatDate(invoice.issue_date)}</Text>
          <Text>Data scadentă: {formatDate(invoice.due_date)}</Text>
        </View>
      </View>

      {/* Furnizor și Cumpărător */}
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.sectionTitle}>Furnizor</Text>
          <Text style={[styles.text, styles.bold]}>{template?.company_name || 'UNISON LOGE FX SRL'}</Text>
          <Text style={styles.text}>CUI: {template?.company_cui || ''}</Text>
          <Text style={styles.text}>Nr. reg.: {template?.company_registration || ''}</Text>
          {template?.company_city && <Text style={styles.text}>{template.company_city}</Text>}
          <Text style={styles.text}>{template?.company_address || ''}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.sectionTitle}>Cumpărător</Text>
          <Text style={[styles.text, styles.bold]}>{invoice.client?.name || ''}</Text>
          {invoice.client?.cui && <Text style={styles.text}>CUI: {invoice.client.cui}</Text>}
          {invoice.client?.address && <Text style={styles.text}>{invoice.client.address}</Text>}
          {invoice.client?.email && <Text style={styles.text}>Email: {invoice.client.email}</Text>}
          {invoice.client?.phone && <Text style={styles.text}>Tel: {invoice.client.phone}</Text>}
        </View>
      </View>

      {/* Tabel articole */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.colDesc}>Descriere</Text>
          <Text style={styles.colQty}>Cantitate</Text>
          <Text style={styles.colPrice}>Preț unitar</Text>
          <Text style={styles.colVat}>TVA %</Text>
          <Text style={styles.colTotal}>Total</Text>
        </View>
        {invoice.items.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.colDesc}>{item.description}</Text>
            <Text style={styles.colQty}>{item.quantity}</Text>
            <Text style={styles.colPrice}>{formatCurrency(item.unit_price)}</Text>
            <Text style={styles.colVat}>{item.vat_rate}%</Text>
            <Text style={styles.colTotal}>{formatCurrency(item.total)}</Text>
          </View>
        ))}
      </View>

      {/* Totaluri */}
      <View style={styles.totalsSection}>
        <View style={styles.totalRow}>
          <Text>Subtotal:</Text>
          <Text>{formatCurrency(invoice.subtotal)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text>TVA:</Text>
          <Text>{formatCurrency(invoice.vat_amount)}</Text>
        </View>
        <View style={[styles.totalRow, styles.grandTotal]}>
          <Text>TOTAL:</Text>
          <Text>{formatCurrency(invoice.total)}</Text>
        </View>
      </View>

      {/* Modalitate de plată */}
      {(template?.bank_name || template?.bank_account) && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Modalitate de plată</Text>
          {template.bank_name && <Text style={styles.text}>Bancă: {template.bank_name}</Text>}
          {template.bank_account && <Text style={styles.text}>IBAN: {template.bank_account}</Text>}
        </View>
      )}

      {/* Termeni și notițe */}
      {invoice.payment_terms && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Termeni de plată</Text>
          <Text style={styles.text}>{invoice.payment_terms}</Text>
        </View>
      )}

      {invoice.notes && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notițe</Text>
          <Text style={styles.text}>{invoice.notes}</Text>
        </View>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Factură generată în data: {formatDate(new Date().toISOString())}</Text>
      </View>
    </Page>
  </Document>
);

export const generateInvoicePDF = async (invoice: InvoiceData, template?: TemplateData): Promise<Blob> => {
  const doc = <InvoicePDF invoice={invoice} template={template} />;
  const blob = await pdf(doc).toBlob();
  return blob;
};

export const downloadInvoicePDF = async (invoice: InvoiceData, template?: TemplateData) => {
  const blob = await generateInvoicePDF(invoice, template);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `factura-${invoice.invoice_number}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
};