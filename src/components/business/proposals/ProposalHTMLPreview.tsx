import { useEffect, useRef, useState } from 'react';
import DOMPurify from 'dompurify';
import html2pdf from 'html2pdf.js';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ProposalHTMLPreviewProps {
  htmlContent: string;
  businessName: string;
}

export function ProposalHTMLPreview({ htmlContent, businessName }: ProposalHTMLPreviewProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;

    setIsGenerating(true);
    try {
      const element = contentRef.current;
      
      const opt = {
        margin: 0,
        filename: `Propunere-${businessName}-${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          logging: false,
          letterRendering: true
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait' as const
        }
      };

      await html2pdf().set(opt).from(element).save();
      
      toast({
        title: 'Succes',
        description: 'PDF-ul a fost descărcat cu succes',
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: 'Eroare',
        description: 'A apărut o eroare la generarea PDF-ului',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const sanitizedHTML = DOMPurify.sanitize(htmlContent, {
    ADD_TAGS: ['style'],
    ADD_ATTR: ['target'],
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          onClick={handleDownloadPDF}
          disabled={isGenerating}
          className="bg-purple-600 hover:bg-purple-700"
          size="sm"
        >
          <Download className="h-4 w-4 mr-2" />
          {isGenerating ? 'Generez PDF...' : 'Salvează ca PDF'}
        </Button>
      </div>
      
      <div 
        ref={contentRef}
        dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
        className="bg-white"
      />
    </div>
  );
}
