import { useEffect, useRef, useState } from 'react';
import DOMPurify from 'dompurify';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { toast } from '@/hooks/use-toast';

interface ProposalHTMLPreviewProps {
  htmlContent: string;
  businessName: string;
}

export function ProposalHTMLPreview({ htmlContent, businessName }: ProposalHTMLPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (iframeRef.current && htmlContent) {
      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (iframeDoc) {
        // Sanitize HTML for security
        const sanitizedHTML = DOMPurify.sanitize(htmlContent, {
          ADD_TAGS: ['style', 'script'],
          ADD_ATTR: ['target'],
        });
        
        iframeDoc.open();
        iframeDoc.write(sanitizedHTML);
        iframeDoc.close();
      }
    }
  }, [htmlContent]);

  const handleDownloadPDF = async () => {
    if (!iframeRef.current?.contentDocument?.body) {
      toast({
        title: 'Eroare',
        description: 'Nu s-a putut încărca conținutul propunerii',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Get the body content from iframe
      const element = iframeRef.current.contentDocument.body;
      
      // Configure PDF options
      const opt = {
        margin: 0,
        filename: `Propunere_${businessName.replace(/[^a-z0-9]/gi, '_')}_${new Date().toISOString().split('T')[0]}.pdf`,
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

      // Generate and download PDF
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

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Previzualizare Propunere - {businessName}</h3>
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
      
      <div className="flex-1 bg-white rounded-lg overflow-hidden">
        <iframe
          ref={iframeRef}
          title={`Proposal for ${businessName}`}
          className="w-full h-full border-0"
          sandbox="allow-same-origin allow-scripts"
        />
      </div>
    </div>
  );
}
