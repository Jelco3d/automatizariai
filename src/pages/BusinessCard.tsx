import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import * as QRCode from 'qrcode';
import { Download, User, Phone, Mail } from "lucide-react";
import jelcoProfile from '@/assets/jelco-profile.jpg';
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
  return <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl w-full relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-extralight text-white mb-6 tracking-wide">
            Premium <span className="font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Business Card</span>
          </h1>
          <p className="text-slate-400 text-xl font-light">Experiență digitală de înaltă calitate</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Premium Business Card */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            <Card className="relative backdrop-blur-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5"></div>
              <CardContent className="p-10 relative">
                <div className="flex flex-col h-full space-y-8">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg ring-2 ring-blue-500/20">
                      <img src={jelcoProfile} alt="Jelco - Founder" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-right">
                      <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mb-2"></div>
                      <div className="w-8 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Personal & Company Info */}
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
                      Jelco
                    </h2>
                    <h3 className="text-2xl font-semibold text-blue-300 mb-3 tracking-tight">
                      AI Automatizări
                    </h3>
                    <p className="text-slate-300 text-lg font-medium mb-1">
                      Automatizare & Dezvoltare Web
                    </p>
                    <p className="text-slate-400 text-sm font-light">
                      Premium Digital Solutions
                    </p>
                  </div>
                  
                  {/* Contact Info */}
                  <div className="space-y-4 pt-4 border-t border-slate-700/50">
                    <div className="flex items-center gap-4 group/contact">
                      <div className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center group-hover/contact:bg-blue-600/20 transition-colors">
                        <Phone className="w-4 h-4 text-slate-400 group-hover/contact:text-blue-400" />
                      </div>
                      <span className="text-slate-300 font-mono text-sm tracking-wider">+40754274528</span>
                    </div>
                    <div className="flex items-center gap-4 group/contact">
                      <div className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center group-hover/contact:bg-purple-600/20 transition-colors">
                        <Mail className="w-4 h-4 text-slate-400 group-hover/contact:text-purple-400" />
                      </div>
                      <span className="text-slate-300 font-mono text-sm tracking-wider">contact@aiautomatizari.ro</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Premium QR Code Section */}
          <div className="flex flex-col items-center space-y-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-20"></div>
              <Card className="relative backdrop-blur-xl bg-slate-900/90 border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
                <CardContent className="flex flex-col items-center space-y-6">
                  <div className="text-center mb-2">
                    <h3 className="text-2xl font-bold text-white mb-2">Conectare Instant</h3>
                    <p className="text-slate-400 text-sm">Scanați pentru acces complet</p>
                  </div>
                  
                  {qrCodeUrl && <div className="relative p-6 bg-white rounded-2xl shadow-inner">
                      <img src={qrCodeUrl} alt="QR Code pentru link tree" className="w-48 h-48 object-contain" />
                    </div>}
                  
                  <Button onClick={handleDownload} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8 py-3 rounded-xl font-medium tracking-wide shadow-lg hover:shadow-xl transition-all duration-300" size="lg">
                    <Download className="w-5 h-5 mr-3" />
                    Descărcare Premium
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Premium Features */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              <div className="text-center p-4 rounded-xl bg-slate-900/50 border border-slate-700/30">
                <div className="w-8 h-8 bg-blue-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                </div>
                <p className="text-xs text-slate-400">Calitate Premium</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-slate-900/50 border border-slate-700/30">
                <div className="w-8 h-8 bg-purple-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                </div>
                <p className="text-xs text-slate-400">Acces Instant</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default BusinessCard;