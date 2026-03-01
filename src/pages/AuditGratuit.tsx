import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MessageCircle, Target, TrendingUp } from "lucide-react";
import { Navigation } from "@/components/website/Navigation";
import { Footer } from "@/components/website/Footer";
import { AuditChat } from "@/components/AuditChat";

const AuditGratuit = () => {
  const handleStartAnalysis = () => {
    window.open('https://calendly.com/aiautomatizari/automatizari-ai', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-yellow-500/[0.07] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] bg-amber-500/[0.05] rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-24 md:pt-32 pb-4 md:pb-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            <span className="text-white font-bold">AUDIT GRATUIT!</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400">
              Descoperă cum poate AI să-ți transforme afacerea — în doar câteva minute!
            </span>
          </h1>
          <p className="text-base md:text-xl lg:text-2xl text-white/60 mb-6 md:mb-8 leading-relaxed">
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
        <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent mb-12" />
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400">
          💬 Cum funcționează
        </h2>
        
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {[
            { icon: MessageCircle, title: "Descrie-ți afacerea", desc: "Ce Faci, Cui te adresezi Și Care Sunt Provocările Tale Zilnice." },
            { icon: Target, title: "AI-ul analizează", desc: "Răspunsurile Tale Sunt Analizate Și Identificăm Oportunități De Automatizare Și Soluții Inteligente." },
            { icon: TrendingUp, title: "Primești raportul", desc: "Raport personalizat instant cu recomandări clare despre cum să începi să scalezi cu AI." },
          ].map(({ icon: Icon, title, desc }, i) => (
            <Card key={i} className="bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:border-yellow-400/30 transition-all">
              <CardContent className="p-4 md:p-6 text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg shadow-yellow-500/25">
                  <Icon className="w-6 h-6 md:w-8 md:h-8 text-black" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">{title}</h3>
                <p className="text-white/60 text-sm md:text-base">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Next Steps Section */}
      <section className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-yellow-400/10 to-amber-500/5 p-6 md:p-8 lg:p-12 rounded-2xl border border-yellow-400/20 backdrop-blur-sm shadow-lg shadow-yellow-500/10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 md:mb-6 text-white">
            🤝 Vrei să mergem mai departe?
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-white/60 text-center mb-6 md:mb-8">
            După ce vezi planul tău de optimizare AI, poți programa gratuit un apel strategic cu echipa noastră.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-6">
          <Button onClick={handleStartAnalysis} size="lg" className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-semibold px-6 md:px-8 py-5 md:py-6 text-base md:text-lg rounded-lg transform transition-all hover:scale-105 animate-glow-pulse w-full md:w-auto">
            Vreau AI În Afacerea Mea
            <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
          </Button>
          <p className="text-white/30 text-sm">Fără costuri ascunse. Fără obligații.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AuditGratuit;
