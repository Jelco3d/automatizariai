import { useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface ProposalHTMLPreviewProps {
  htmlContent: string;
  businessName: string;
}

export function ProposalHTMLPreview({ htmlContent, businessName }: ProposalHTMLPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

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

  const handlePrint = () => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.print();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Previzualizare Propunere - {businessName}</h3>
        <Button
          onClick={handlePrint}
          className="bg-purple-600 hover:bg-purple-700"
          size="sm"
        >
          <Download className="h-4 w-4 mr-2" />
          Salvează ca PDF
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
