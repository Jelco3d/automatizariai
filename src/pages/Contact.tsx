import { Navigation } from '@/components/website/Navigation';
import { Footer } from '@/components/website/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, MapPin } from 'lucide-react';
import { WebsiteChatbot } from '@/components/website/WebsiteChatbot';

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#0a0e1a] relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-yellow-500/[0.07] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] bg-amber-500/[0.05] rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <Navigation />
      
      <main className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent">
              Contactează-ne
            </h1>
            <p className="text-xl text-white/60">
              Suntem aici să te ajutăm cu automatizările tale cu AI
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-5 md:p-8 bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] hover:border-yellow-400/30 transition-all">
              <CardContent className="p-0 space-y-6">
                <h2 className="text-2xl font-semibold mb-6 text-white">Informații de Contact</h2>
                
                {[
                  { icon: Phone, label: "Telefon", content: <a href="tel:+40754274528" className="text-white/60 hover:text-yellow-400 transition-colors">+40 754 274 528</a> },
                  { icon: Mail, label: "Email", content: <a href="mailto:contact@aiautomatizari.ro" className="text-white/60 hover:text-yellow-400 transition-colors">contact@aiautomatizari.ro</a> },
                  { icon: MapPin, label: "Persoana de Contact", content: <p className="text-white/60">Jelco</p> },
                ].map(({ icon: Icon, label, content }, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-yellow-400/10 rounded-lg">
                      <Icon className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{label}</h3>
                      {content}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="p-5 md:p-8 bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] hover:border-yellow-400/30 transition-all">
              <CardContent className="p-0">
                <h2 className="text-2xl font-semibold mb-6 text-white">Programează o Consultație</h2>
                <p className="text-white/60 mb-6">
                  Vrei să afli cum te poate ajuta AI-ul să îți automatizezi procesele? 
                  Programează o consultație gratuită și să discutăm despre nevoile tale.
                </p>
                <button 
                  onClick={() => window.open('https://calendly.com/cosmincatalin-ai/30min', '_blank')}
                  className="w-full btn-3d-gold px-6 py-3 rounded-lg animate-glow-pulse"
                >
                  Programează Consultație Gratuită
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
      <WebsiteChatbot />
    </div>
  );
};

export default Contact;
