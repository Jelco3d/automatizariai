import { Document, Page, Text, View, StyleSheet, Image, pdf } from '@react-pdf/renderer';
import { formatDate } from './dateFormatters';
import { formatCurrency } from './numberFormatters';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#6366f1',
  },
  logoSection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  brandName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6366f1',
    marginTop: 5,
  },
  invoiceInfo: {
    textAlign: 'right',
  },
  invoiceNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1f2937',
  },
  dateText: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 3,
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f9fafb',
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'uppercase',
    color: '#6366f1',
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  column: {
    width: '48%',
    padding: 15,
    backgroundColor: '#f9fafb',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  text: {
    marginBottom: 4,
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.4,
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 10,
    color: '#1f2937',
  },
  table: {
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 4,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#6366f1',
    paddingVertical: 10,
    paddingHorizontal: 8,
    fontWeight: 'bold',
  },
  tableHeaderText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e5e7eb',
  },
  tableRowAlt: {
    backgroundColor: '#f9fafb',
  },
  colDesc: { width: '40%' },
  colQty: { width: '15%', textAlign: 'center' },
  colPrice: { width: '15%', textAlign: 'right' },
  colVat: { width: '15%', textAlign: 'center' },
  colTotal: { width: '15%', textAlign: 'right' },
  totalsSection: {
    marginTop: 20,
    alignItems: 'flex-end',
    paddingRight: 15,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 220,
    marginBottom: 8,
    paddingVertical: 4,
  },
  totalLabel: {
    fontSize: 10,
    color: '#6b7280',
  },
  totalValue: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  grandTotal: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 8,
    paddingTop: 10,
    borderTopWidth: 2,
    borderTopColor: '#6366f1',
    color: '#6366f1',
  },
  paymentSection: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#eff6ff',
    borderRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
  },
  footer: {
    marginTop: 40,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 8,
    color: '#9ca3af',
  },
  footerBrand: {
    fontSize: 9,
    color: '#6366f1',
    fontWeight: 'bold',
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
        <View style={styles.logoSection}>
          {template?.logo_url ? (
            <Image src={template.logo_url} style={styles.logo} />
          ) : (
            <View style={{ width: 100, height: 100, backgroundColor: '#6366f1', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#ffffff', fontSize: 32, fontWeight: 'bold' }}>AI</Text>
            </View>
          )}
          <Text style={styles.brandName}>AI Automatizări</Text>
        </View>
        <View style={styles.invoiceInfo}>
          <Text style={styles.invoiceNumber}>FACTURĂ {invoice.invoice_number}</Text>
          <Text style={styles.dateText}>Data emiterii: {formatDate(invoice.issue_date)}</Text>
          <Text style={styles.dateText}>Data scadență: {formatDate(invoice.due_date)}</Text>
        </View>
      </View>

      {/* Furnizor și Cumpărător */}
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.sectionTitle}>Furnizor</Text>
          <Text style={[styles.text, styles.bold]}>{template?.company_name || 'UNISON LOGE FX SRL'}</Text>
          <Text style={styles.text}>CUI: {template?.company_cui || ''}</Text>
          <Text style={styles.text}>Nr. înregistrare: {template?.company_registration || ''}</Text>
          {template?.company_city && <Text style={styles.text}>Localitatea: {template.company_city}</Text>}
          <Text style={styles.text}>Adresă: {template?.company_address || ''}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.sectionTitle}>Cumpărător</Text>
          <Text style={[styles.text, styles.bold]}>{invoice.client?.name || ''}</Text>
          {invoice.client?.cui && <Text style={styles.text}>CUI: {invoice.client.cui}</Text>}
          {invoice.client?.address && <Text style={styles.text}>Adresă: {invoice.client.address}</Text>}
          {invoice.client?.email && <Text style={styles.text}>Email: {invoice.client.email}</Text>}
          {invoice.client?.phone && <Text style={styles.text}>Telefon: {invoice.client.phone}</Text>}
        </View>
      </View>

      {/* Tabel articole */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.colDesc, styles.tableHeaderText]}>Descriere</Text>
          <Text style={[styles.colQty, styles.tableHeaderText]}>Cantitate</Text>
          <Text style={[styles.colPrice, styles.tableHeaderText]}>Preț unitar</Text>
          <Text style={[styles.colVat, styles.tableHeaderText]}>TVA %</Text>
          <Text style={[styles.colTotal, styles.tableHeaderText]}>Total</Text>
        </View>
        {invoice.items.map((item, index) => (
          <View key={index} style={[styles.tableRow, index % 2 === 1 && styles.tableRowAlt]}>
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
          <Text style={styles.totalLabel}>Subtotal:</Text>
          <Text style={styles.totalValue}>{formatCurrency(invoice.subtotal)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>TVA:</Text>
          <Text style={styles.totalValue}>{formatCurrency(invoice.vat_amount)}</Text>
        </View>
        <View style={[styles.totalRow, styles.grandTotal]}>
          <Text>TOTAL DE PLATĂ:</Text>
          <Text>{formatCurrency(invoice.total)}</Text>
        </View>
      </View>

      {/* Modalitate de plată */}
      {(template?.bank_name || template?.bank_account) && (
        <View style={styles.paymentSection}>
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
        <Text style={styles.footerText}>Factură generată la: {formatDate(new Date().toISOString())}</Text>
        <Text style={styles.footerBrand}>AI Automatizări - Soluții inteligente pentru afacerea ta</Text>
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