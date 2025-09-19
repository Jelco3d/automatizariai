import { Navigation } from '@/components/website/Navigation';
import { Footer } from '@/components/website/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Contactează-ne
            </h1>
            <p className="text-xl text-muted-foreground">
              Suntem aici să te ajutăm cu automatizările tale cu AI
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8">
              <CardContent className="p-0 space-y-6">
                <h2 className="text-2xl font-semibold mb-6">Informații de Contact</h2>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Telefon</h3>
                    <a href="tel:+40754274528" className="text-muted-foreground hover:text-primary transition-colors">
                      +40 754 274 528
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <a href="mailto:contact@aiautomatizari.ro" className="text-muted-foreground hover:text-primary transition-colors">
                      contact@aiautomatizari.ro
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Persoana de Contact</h3>
                    <p className="text-muted-foreground">Jelco</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardContent className="p-0">
                <h2 className="text-2xl font-semibold mb-6">Programează o Consultație</h2>
                <p className="text-muted-foreground mb-6">
                  Vrei să afli cum te poate ajuta AI-ul să îți automatizezi procesele? 
                  Programează o consultație gratuită și să discutăm despre nevoile tale.
                </p>
                <button 
                  onClick={() => window.open('https://calendly.com/cosmincatalin-ai/30min', '_blank')}
                  className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  Programează Consultație Gratuită
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;