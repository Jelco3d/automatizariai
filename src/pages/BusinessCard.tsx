import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import * as QRCode from 'qrcode';
import { Download, User, Phone, Mail } from "lucide-react";

const BusinessCard = () => {
  const [qrCodeUrl, setQrCodeUrl] = React.useState('');
  
  React.useEffect(() => {
    const generateQRCode = async () => {
      try {
        const linkTreeUrl = `${window.location.origin}/linktree`;
        const url = await QRCode.toDataURL(linkTreeUrl, {
          width: 200,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });
        setQrCodeUrl(url);
      } catch (err) {
        console.error('Error generating QR code:', err);
      }
    };
    
    generateQRCode();
  }, []);

  const handleDownload = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.href = qrCodeUrl;
      link.download = 'business-card-qr.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">Business Card</h1>
          <p className="text-muted-foreground">Scanați codul QR pentru a accesa informațiile mele de contact</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Business Card */}
          <Card className="p-8 bg-gradient-to-br from-primary to-primary/80 text-white shadow-2xl">
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold mb-2">AI Automatizări</h2>
                <p className="text-white/90 text-lg">Automatizare & Dezvoltare Web</p>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4" />
                  <span>+40754274528</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4" />
                  <span>contact@aiautomatizari.ro</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* QR Code Section */}
          <div className="text-center">
            <Card className="p-6 inline-block">
              <CardContent className="space-y-4">
                {qrCodeUrl && (
                  <img 
                    src={qrCodeUrl} 
                    alt="QR Code pentru link tree" 
                    className="mx-auto"
                  />
                )}
                <p className="text-sm text-muted-foreground">
                  Scanați pentru acces rapid la toate linkurile
                </p>
                <Button onClick={handleDownload} variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Descărcați QR Code
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;