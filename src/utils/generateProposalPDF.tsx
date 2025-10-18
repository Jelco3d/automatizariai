import { Document, Page, Text, View, StyleSheet, pdf, Font } from '@react-pdf/renderer';

// Register Noto Sans font for full Romanian diacritics support (comma-below ț/ș)
Font.register({
  family: 'Noto Sans',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/notosans/v36/o-0IIpQlx3QUlC5A4PNjhg.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/notosans/v36/o-0NIpQlx3QUlC5A4PZcZ8G0.ttf', fontWeight: 700 }
  ]
});

// Normalize Romanian diacritics to correct comma-below forms
const normalizeRomanian = (text: string): string => {
  return text
    .replace(/\u015F/g, "ș") // ş → ș (s with comma below)
    .replace(/\u015E/g, "Ș") // Ş → Ș
    .replace(/\u0163/g, "ț") // ţ → ț (t with comma below)
    .replace(/\u0162/g, "Ț") // Ţ → Ț
    .normalize("NFC");
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Noto Sans',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#1A1F2C',
    fontWeight: 700,
    fontFamily: 'Noto Sans',
  },
  section: {
    marginBottom: 12,
  },
  text: {
    fontSize: 11,
    lineHeight: 1.6,
    color: '#333333',
    textAlign: 'justify',
    fontFamily: 'Noto Sans',
  },
  header: {
    fontSize: 14,
    marginBottom: 8,
    marginTop: 12,
    color: '#6366F1',
    fontWeight: 700,
    fontFamily: 'Noto Sans',
  },
  bold: {
    fontWeight: 700,
    fontFamily: 'Noto Sans',
  },
});

interface ProposalPDFProps {
  businessName: string;
  proposal: string;
}

interface ParsedSegment {
  text: string;
  bold: boolean;
}

// Parse inline bold markers (**text**)
const parseInlineBold = (text: string): ParsedSegment[] => {
  const segments: ParsedSegment[] = [];
  const parts = text.split('**');
  
  parts.forEach((part, index) => {
    if (part) {
      segments.push({
        text: part,
        bold: index % 2 === 1, // Odd indices are bold (between **)
      });
    }
  });
  
  return segments;
};

// Parse a line to determine if it's a header
const parseLine = (line: string): { type: 'header' | 'text'; content: string } => {
  const headerMatch = line.match(/^#+\s+(.+)$/);
  if (headerMatch) {
    return { type: 'header', content: headerMatch[1] };
  }
  return { type: 'text', content: line };
};

const ProposalPDF = ({ businessName, proposal }: ProposalPDFProps) => {
  const sections = proposal.split('\n\n').filter(section => section.trim());

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Propunere pentru {businessName}</Text>
        
        {sections.map((section, sectionIndex) => {
          const lines = section.split('\n').filter(line => line.trim());
          
          return (
            <View key={sectionIndex} style={styles.section}>
              {lines.map((line, lineIndex) => {
                const parsed = parseLine(line);
                
                if (parsed.type === 'header') {
                  return (
                    <Text key={lineIndex} style={styles.header}>
                      {parsed.content}
                    </Text>
                  );
                }
                
                const segments = parseInlineBold(parsed.content);
                
                return (
                  <Text key={lineIndex} style={styles.text}>
                    {segments.map((segment, segIndex) => (
                      <Text key={segIndex} style={segment.bold ? styles.bold : {}}>
                        {segment.text}
                      </Text>
                    ))}
                  </Text>
                );
              })}
            </View>
          );
        })}
      </Page>
    </Document>
  );
};

export const generateProposalPDF = async (businessName: string, proposal: string) => {
  // Normalize diacritics before generating PDF
  const safeProposal = normalizeRomanian(proposal);
  const blob = await pdf(<ProposalPDF businessName={businessName} proposal={safeProposal} />).toBlob();
  
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Propunere_${businessName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};