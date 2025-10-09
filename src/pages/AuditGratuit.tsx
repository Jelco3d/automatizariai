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
      <section className="container mx-auto px-4 pt-32 pb-8 text-center relative z-10">
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
            Descoperă cum poate AI să-ți transforme afacerea — în doar câteva minute!
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Povestește-ne puțin despre afacerea ta, iar AI-ul nostru inteligent o va analiza personal — dezvăluindu-ți cum poți economisi timp, reduce costurile și crește mai rapid prin automatizare și optimizare bazată pe inteligență artificială.
          </p>
        </div>
      </section>

      {/* Chat Section */}
      <section className="container mx-auto px-4 pb-16 relative z-10">
        <AuditChat />
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
          💬 Cum funcționează
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="bg-[#1A1F2C]/80 border-purple-500/30 backdrop-blur-sm hover:border-purple-500/50 transition-all">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Descrie-ți afacerea</h3>
              <p className="text-gray-300">
                Ce faci, cui te adresezi și care sunt provocările tale zilnice.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/80 border-purple-500/30 backdrop-blur-sm hover:border-purple-500/50 transition-all">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">AI-ul analizează</h3>
              <p className="text-gray-300">
                Răspunsurile tale sunt analizate și identificăm oportunități de automatizare și soluții inteligente.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/80 border-purple-500/30 backdrop-blur-sm hover:border-purple-500/50 transition-all">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Primești raportul</h3>
              <p className="text-gray-300">
                Raport personalizat instant — cu recomandări clare despre cum să începi și să scalezi cu AI.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why You'll Love It Section */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
          ❤️ De ce o să-ți placă
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="flex items-start gap-4 bg-[#1A1F2C]/60 p-6 rounded-lg border border-purple-500/30 backdrop-blur-sm hover:border-purple-500/50 transition-all">
            <DollarSign className="w-8 h-8 text-green-400 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">100% gratuit</h3>
              <p className="text-gray-300">Fără obligații, doar informații valoroase.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-[#1A1F2C]/60 p-6 rounded-lg border border-purple-500/30 backdrop-blur-sm hover:border-purple-500/50 transition-all">
            <Target className="w-8 h-8 text-purple-400 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Creat special pentru tine</h3>
              <p className="text-gray-300">Nu o listă generică, ci idei reale și aplicabile.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-[#1A1F2C]/60 p-6 rounded-lg border border-purple-500/30 backdrop-blur-sm hover:border-purple-500/50 transition-all">
            <Rocket className="w-8 h-8 text-pink-400 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Dezvăluie-ți potențialul</h3>
              <p className="text-gray-300">Află ce poți automatiza, optimiza sau transforma complet.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps Section */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#2C1F3C]/80 to-[#3C1F3C]/80 p-8 md:p-12 rounded-2xl border border-purple-500/40 backdrop-blur-sm shadow-lg shadow-purple-500/20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-white">
            🤝 Vrei să mergem mai departe?
          </h2>
          <p className="text-xl text-gray-300 text-center mb-8">
            După ce vezi planul tău de optimizare AI, poți programa gratuit un apel strategic cu echipa noastră.
          </p>
          
          

          <p className="text-2xl text-center text-white mb-8 italic">
            „Hai să facem împreună afacerea ta mai inteligentă, mai eficientă și pregătită pentru viitor."
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <Button onClick={handleStartAnalysis} size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg rounded-lg transform transition-all hover:scale-105 w-full md:w-auto">
            👉 Începe analiza mea AI gratuită
            <ArrowRight className="ml-2" />
          </Button>
          <p className="text-gray-400 text-sm">
            Durează mai puțin de 2 minute — rezultate instantanee
          </p>

          <div className="py-4">
            <span className="text-gray-500">sau</span>
          </div>

          <Button onClick={handleBookCall} variant="outline" size="lg" className="border-2 border-purple-500 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400 px-8 py-6 text-lg rounded-lg w-full md:w-auto transition-all">
            <Phone className="mr-2" />
            🗓️ Programează un apel strategic gratuit cu un expert AI
          </Button>
        </div>
      </section>

      {/* Bonus Section */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
            💡 Bonus
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-6 bg-[#1A1F2C]/60 rounded-lg border border-purple-500/30 backdrop-blur-sm hover:border-purple-500/50 transition-all">
              <Lock className="w-12 h-12 text-purple-400 mb-4" />
              <h4 className="text-white font-semibold mb-2">100% confidențial</h4>
              <p className="text-gray-400 text-sm">Informațiile tale rămân private</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-[#1A1F2C]/60 rounded-lg border border-purple-500/30 backdrop-blur-sm hover:border-purple-500/50 transition-all">
              <Zap className="w-12 h-12 text-yellow-400 mb-4" />
              <h4 className="text-white font-semibold mb-2">Rezultate instantanee</h4>
              <p className="text-gray-400 text-sm">Fără formulare complicate</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-[#1A1F2C]/60 rounded-lg border border-purple-500/30 backdrop-blur-sm hover:border-purple-500/50 transition-all">
              <CheckCircle className="w-12 h-12 text-green-400 mb-4" />
              <h4 className="text-white font-semibold mb-2">De încredere</h4>
              <p className="text-gray-400 text-sm">Pentru antreprenori, consultanți și creatori</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default AuditGratuit;