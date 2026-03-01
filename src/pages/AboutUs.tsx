
import { motion } from "framer-motion";
import { Navigation } from "@/components/website/Navigation";
import { Footer } from "@/components/website/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WebsiteChatbot } from "@/components/website/WebsiteChatbot";
import { ArrowRight } from "lucide-react";

const AboutUs = () => {
  console.log("Rendering AboutUs page");

  const handleBooking = () => {
    window.open('https://calendly.com/aiautomatizari/automatizari-ai', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white overflow-hidden">
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-yellow-500/[0.07] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] bg-amber-500/[0.05] rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-yellow-400/[0.04] rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <Navigation />
      
      {/* About Me Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="container mx-auto px-4 pt-24 md:pt-32 pb-16 relative z-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400">Despre Mine</h2>
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
            <CardContent className="p-5 md:p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-yellow-400/20">
                  <img 
                    src="/lovable-uploads/18adcde2-6fef-4f80-9177-96ee902a301b.png"
                    alt="Erdelean Jelco"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl font-semibold text-yellow-400">Erdelean Jelco</h3>
                  <p className="text-lg text-white/60">Expert în Automatizare AI & Fondator</p>
                  <p className="text-white/60">
                    Cu o pasiune pentru tehnologie și inovație, m-am dedicat dezvoltării de soluții AI care transformă modul în care companiile operează. Specializat în automatizarea proceselor de afaceri, ajut organizațiile să-și eficientizeze operațiunile și să-și maximizeze potențialul prin implementarea tehnologiilor inteligente.
                  </p>
                  <div className="pt-4 flex justify-center">
                    <Button 
                      onClick={handleBooking}
                      className="btn-3d-gold"
                    >
                      Programează o Consultație
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />

      {/* Company Story Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-10 md:py-16 relative z-10"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-amber-400">
          Povestea Noastră
        </h1>
        <div className="max-w-3xl mx-auto text-white/60 space-y-4">
          <p>
            Fondată în 2024, compania noastră s-a născut din dorința de a transforma și simplifica procesele de afaceri prin soluții AI avansate. Pornind de la o echipă mică dar ambițioasă, ne-am dezvoltat rapid într-un lider inovator în domeniul automatizării.
          </p>
          <p>
            Astăzi, continuăm să împingem limitele posibilului cu AI, ajutând afaceri din întreaga lume să-și transforme operațiunile și să atingă o eficiență fără precedent.
          </p>
        </div>
      </motion.section>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />

      {/* Mission and Values Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="container mx-auto px-4 py-10 md:py-16 relative z-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400">Misiune & Valori</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:border-yellow-400/30 transition-all">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-yellow-400">Misiunea Noastră</h3>
              <p className="text-white/60">
                Să împuternicim afacerile prin soluții inteligente de automatizare care stimulează creșterea și inovația.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:border-yellow-400/30 transition-all">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-yellow-400">Valorile Noastre</h3>
              <ul className="text-white/60 space-y-2">
                <li>• Inovație în Prim Plan</li>
                <li>• Succesul Clientului</li>
                <li>• Învățare Continuă</li>
                <li>• AI Etic</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />

      {/* Company Culture Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="container mx-auto px-4 py-10 md:py-16 relative z-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400">Cultura Noastră</h2>
        <div className="max-w-3xl mx-auto text-white/60 space-y-6">
          <p className="text-center">
            Promovăm un mediu de creativitate, colaborare și creștere continuă. Membrii echipei noastre sunt încurajați să inoveze, să ia inițiativă și să contribuie la succesul nostru colectiv.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {["Remote-First", "Program Flexibil", "Buget pentru Învățare", "Evenimente de Echipă"].map((item, i) => (
              <div key={i} className="p-3 md:p-4 bg-yellow-400/10 rounded-lg border border-yellow-400/20">
                <p className="font-semibold text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="container mx-auto px-4 py-10 md:py-16 text-center relative z-10"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Gata să-ți Transformi Afacerea?</h2>
        <Button 
          onClick={handleBooking}
          className="btn-3d-gold animate-glow-pulse"
        >
          Programează o Consultație
          <ArrowRight className="ml-2" />
        </Button>
        <p className="text-white/30 text-sm mt-4">Fără costuri ascunse. Fără obligații.</p>
      </motion.section>

      <Footer />
      <WebsiteChatbot />
    </div>
  );
};

export default AboutUs;
