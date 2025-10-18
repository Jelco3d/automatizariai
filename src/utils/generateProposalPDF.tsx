import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#1A1F2C',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 15,
  },
  text: {
    fontSize: 11,
    lineHeight: 1.6,
    color: '#333333',
    textAlign: 'justify',
  },
  header: {
    fontSize: 14,
    marginBottom: 10,
    marginTop: 10,
    color: '#6366F1',
    fontWeight: 'bold',
  },
});

interface ProposalPDFProps {
  businessName: string;
  proposal: string;
}

const ProposalPDF = ({ businessName, proposal }: ProposalPDFProps) => {
  // Split the proposal into sections and paragraphs
  const sections = proposal.split('\n\n').filter(section => section.trim());

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Propunere pentru {businessName}</Text>
        
        {sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.text}>{section}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};

export const generateProposalPDF = async (businessName: string, proposal: string) => {
  const blob = await pdf(<ProposalPDF businessName={businessName} proposal={proposal} />).toBlob();
  
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Propunere_${businessName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};