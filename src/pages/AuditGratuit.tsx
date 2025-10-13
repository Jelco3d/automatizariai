import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Lock, Zap, MessageCircle, Target, DollarSign, Rocket, TrendingUp, Clock, Phone } from "lucide-react";
import { Navigation } from "@/components/website/Navigation";
import { Footer } from "@/components/website/Footer";
import { AuditChat } from "@/components/AuditChat";
const AuditGratuit = () => {
  const handleStartAnalysis = () => {
    window.open('https://calendly.com/aiautomatizari/automatizariai', '_blank');
  };
  const handleBookCall = () => {
    window.open('https://calendly.com/aiautomatizari/automatizariai', '_blank');
  };
  return <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2C1F3C] to-[#1A1F2C] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-24 md:pt-32 pb-4 md:pb-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            <span className="text-white font-bold">AUDIT GRATUIT!</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
              Descoperă cum poate AI să-ți transforme afacerea — în doar câteva minute!
            </span>
          </h1>
          <p className="text-base md:text-xl lg:text-2xl text-gray-300 mb-6 md:mb-8 leading-relaxed">
            Povestește-ne puțin despre afacerea ta, iar AI-ul nostru inteligent o va analiza personal — dezvăluindu-ți cum poți economisi timp, reduce costurile și crește mai rapid prin automatizare și optimizare bazată pe inteligență artificială.
          </p>
        </div>
      </section>

      {/* Chat Section */}
      <section className="container mx-auto px-4 pb-8 md:pb-12 relative z-10">
        <AuditChat />
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
          💬 Cum funcționează
        </h2>
        
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
          <Card className="bg-[#1A1F2C]/80 border-purple-500/30 backdrop-blur-sm hover:border-purple-500/50 transition-all">
            <CardContent className="p-4 md:p-6 text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg shadow-purple-500/25">
                <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">Descrie-ți afacerea</h3>
              <p className="text-gray-300 text-sm md:text-base">
                Ce faci, cui te adresezi și care sunt provocările tale zilnice.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/80 border-purple-500/30 backdrop-blur-sm hover:border-purple-500/50 transition-all">
            <CardContent className="p-4 md:p-6 text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg shadow-purple-500/25">
                <Target className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">AI-ul analizează</h3>
              <p className="text-gray-300 text-sm md:text-base">
                Răspunsurile tale sunt analizate și identificăm oportunități de automatizare și soluții inteligente.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/80 border-purple-500/30 backdrop-blur-sm hover:border-purple-500/50 transition-all">
            <CardContent className="p-4 md:p-6 text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg shadow-purple-500/25">
                <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">Primești raportul</h3>
              <p className="text-gray-300 text-sm md:text-base">
                Raport personalizat instant — cu recomandări clare despre cum să începi și să scalezi cu AI.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why You'll Love It Section */}
      

      {/* Next Steps Section */}
      <section className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#2C1F3C]/80 to-[#3C1F3C]/80 p-6 md:p-8 lg:p-12 rounded-2xl border border-purple-500/40 backdrop-blur-sm shadow-lg shadow-purple-500/20">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 md:mb-6 text-white">
            🤝 Vrei să mergem mai departe?
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-300 text-center mb-6 md:mb-8">
            După ce vezi planul tău de optimizare AI, poți programa gratuit un apel strategic cu echipa noastră.
          </p>
          
          

          
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-6">
          <Button onClick={handleStartAnalysis} size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 md:px-8 py-5 md:py-6 text-base md:text-lg rounded-lg transform transition-all hover:scale-105 w-full md:w-auto">
            Vreau AI În Afacerea Mea
            <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
          </Button>
          

          <div className="py-4">
            
          </div>

          
        </div>
      </section>

      <Footer />
    </div>;
};
export default AuditGratuit;