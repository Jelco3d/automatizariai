import { Document, Page, Text, View, StyleSheet, Font, pdf } from '@react-pdf/renderer';

Font.register({
  family: 'Noto Sans',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/notosans/v36/o-0IIpQlx3QUlC5A4PNjhg.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/notosans/v36/o-0NIpQlx3QUlC5A4PZcZ8G0.ttf', fontWeight: 700 }
  ]
});

const normalizeRomanian = (text: string): string => {
  return text
    .replace(/\u015F/g, "ș")
    .replace(/\u015E/g, "Ș")
    .replace(/\u0163/g, "ț")
    .replace(/\u0162/g, "Ț")
    .normalize("NFC");
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Noto Sans',
    fontSize: 11,
    lineHeight: 1.6,
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Noto Sans',
  },
  section: {
    marginBottom: 15,
  },
  header: {
    fontSize: 13,
    fontWeight: 700,
    marginBottom: 8,
    fontFamily: 'Noto Sans',
  },
  text: {
    fontSize: 11,
    marginBottom: 6,
    fontFamily: 'Noto Sans',
    textAlign: 'justify',
  },
  bold: {
    fontWeight: 700,
    fontFamily: 'Noto Sans',
  },
  signatures: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signatureBlock: {
    width: '45%',
  },
});

interface ContractPDFProps {
  contractNumber: string;
  contractType: string;
  clientName: string;
  contractText: string;
}

interface ParsedSegment {
  text: string;
  bold: boolean;
}

const parseInlineBold = (text: string): ParsedSegment[] => {
  const segments: ParsedSegment[] = [];
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  
  parts.forEach(part => {
    if (part.startsWith('**') && part.endsWith('**')) {
      segments.push({ text: part.slice(2, -2), bold: true });
    } else if (part) {
      segments.push({ text: part, bold: false });
    }
  });
  
  return segments;
};

const parseLine = (line: string): { type: 'header' | 'text'; content: string } => {
  if (line.startsWith('# ')) {
    return { type: 'header', content: line.substring(2) };
  }
  return { type: 'text', content: line };
};

const ContractPDF = ({ contractNumber, contractType, clientName, contractText }: ContractPDFProps) => {
  const sections = contractText.split('\n\n');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>
          CONTRACT DE {contractType.toUpperCase()}
        </Text>
        <Text style={styles.text}>
          Nr. {contractNumber}
        </Text>

        {sections.map((section, sectionIndex) => {
          const lines = section.split('\n').filter(line => line.trim());
          
          return (
            <View key={sectionIndex} style={styles.section}>
              {lines.map((line, lineIndex) => {
                const parsed = parseLine(line);
                const segments = parseInlineBold(parsed.content);

                if (parsed.type === 'header') {
                  return (
                    <Text key={lineIndex} style={styles.header}>
                      {segments.map((seg, i) => (
                        <Text key={i} style={seg.bold ? styles.bold : {}}>
                          {seg.text}
                        </Text>
                      ))}
                    </Text>
                  );
                }

                return (
                  <Text key={lineIndex} style={styles.text}>
                    {segments.map((seg, i) => (
                      <Text key={i} style={seg.bold ? styles.bold : {}}>
                        {seg.text}
                      </Text>
                    ))}
                  </Text>
                );
              })}
            </View>
          );
        })}

        <View style={styles.signatures}>
          <View style={styles.signatureBlock}>
            <Text style={styles.text}>FURNIZOR</Text>
            <Text style={styles.text}>_____________________</Text>
            <Text style={styles.text}>Semnătură și ștampilă</Text>
          </View>
          <View style={styles.signatureBlock}>
            <Text style={styles.text}>CLIENT</Text>
            <Text style={styles.text}>{clientName}</Text>
            <Text style={styles.text}>_____________________</Text>
            <Text style={styles.text}>Semnătură și ștampilă</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export const generateContractPDF = async (
  contractNumber: string,
  contractType: string,
  clientName: string,
  contractText: string
) => {
  const safeContractText = normalizeRomanian(contractText);
  
  const blob = await pdf(
    <ContractPDF
      contractNumber={contractNumber}
      contractType={contractType}
      clientName={clientName}
      contractText={safeContractText}
    />
  ).toBlob();

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Contract_${contractNumber}_${clientName}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
};