import { Navigation } from '@/components/website/Navigation';
import { Footer } from '@/components/website/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, MapPin } from 'lucide-react';
import { WebsiteChatbot } from '@/components/website/WebsiteChatbot';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2C1F3C] to-[#1A1F2C] relative overflow-hidden">
      <Navigation />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <main className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Contactează-ne
            </h1>
            <p className="text-xl text-gray-300">
              Suntem aici să te ajutăm cu automatizările tale cu AI
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 bg-white/10 backdrop-blur-sm border border-purple-500/20">
              <CardContent className="p-0 space-y-6">
                <h2 className="text-2xl font-semibold mb-6 text-white">Informații de Contact</h2>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-lg">
                    <Phone className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Telefon</h3>
                    <a href="tel:+40754274528" className="text-gray-300 hover:text-purple-400 transition-colors">
                      +40 754 274 528
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-lg">
                    <Mail className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Email</h3>
                    <a href="mailto:contact@aiautomatizari.ro" className="text-gray-300 hover:text-purple-400 transition-colors">
                      contact@aiautomatizari.ro
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-lg">
                    <MapPin className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Persoana de Contact</h3>
                    <p className="text-gray-300">Jelco</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 bg-white/10 backdrop-blur-sm border border-purple-500/20">
              <CardContent className="p-0">
                <h2 className="text-2xl font-semibold mb-6 text-white">Programează o Consultație</h2>
                <p className="text-gray-300 mb-6">
                  Vrei să afli cum te poate ajuta AI-ul să îți automatizezi procesele? 
                  Programează o consultație gratuită și să discutăm despre nevoile tale.
                </p>
                <button 
                  onClick={() => window.open('https://calendly.com/cosmincatalin-ai/30min', '_blank')}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium shadow-lg hover:shadow-purple-500/25"
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