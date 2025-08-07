
import { motion } from "framer-motion";
import { Navigation } from "@/components/website/Navigation";
import { Footer } from "@/components/website/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

const AboutUs = () => {
  console.log("Rendering AboutUs page");

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white overflow-hidden">
      <Navigation />
      
      {/* About Me Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="container mx-auto px-4 pt-24 pb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Despre Mine</h2>
        <div className="max-w-4xl mx-auto">
          <Card className="bg-[#2A2F3C]/50 border-purple-500/20 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-purple-500/20">
                  <img 
                    src="/lovable-uploads/18adcde2-6fef-4f80-9177-96ee902a301b.png"
                    alt="Erdelean Jelco"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl font-semibold text-purple-400">Erdelean Jelco</h3>
                  <p className="text-lg text-gray-300">Expert în Automatizare AI & Fondator</p>
                  <p className="text-gray-300">
                    Cu o pasiune pentru tehnologie și inovație, m-am dedicat dezvoltării de soluții AI care transformă modul în care companiile operează. Specializat în automatizarea proceselor de afaceri, ajut organizațiile să-și eficientizeze operațiunile și să-și maximizeze potențialul prin implementarea tehnologiilor inteligente.
                  </p>
                  <div className="pt-4 flex justify-center">
                    <Button 
                      onClick={() => window.open('https://calendly.com/aiautomatizari/automatizariai', '_blank')}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
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

      {/* Company Story Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Povestea Noastră
        </h1>
        <div className="max-w-3xl mx-auto text-gray-300 space-y-4">
          <p>
            Fondată în 2024, compania noastră s-a născut din dorința de a transforma și simplifica procesele de afaceri prin soluții AI avansate. Pornind de la o echipă mică dar ambițioasă, ne-am dezvoltat rapid într-un lider inovator în domeniul automatizării.
          </p>
          <p>
            Astăzi, continuăm să împingem limitele posibilului cu AI, ajutând afaceri din întreaga lume să-și transforme operațiunile și să atingă o eficiență fără precedent.
          </p>
        </div>
      </motion.section>

      {/* Mission and Values Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="container mx-auto px-4 py-16 bg-gradient-to-b from-transparent to-purple-900/10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Misiune & Valori</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-[#2A2F3C]/50 border-purple-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-purple-400">Misiunea Noastră</h3>
              <p className="text-gray-300">
                Să împuternicim afacerile prin soluții inteligente de automatizare care stimulează creșterea și inovația.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-[#2A2F3C]/50 border-purple-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-purple-400">Valorile Noastre</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Inovație în Prim Plan</li>
                <li>• Succesul Clientului</li>
                <li>• Învățare Continuă</li>
                <li>• AI Etic</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Company Culture Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="container mx-auto px-4 py-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Cultura Noastră</h2>
        <div className="max-w-3xl mx-auto text-gray-300 space-y-6">
          <p className="text-center">
            Promovăm un mediu de creativitate, colaborare și creștere continuă. Membrii echipei noastre sunt încurajați să inoveze, să ia inițiativă și să contribuie la succesul nostru colectiv.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-purple-500/10 rounded-lg">
              <p className="font-semibold">Remote-First</p>
            </div>
            <div className="p-4 bg-purple-500/10 rounded-lg">
              <p className="font-semibold">Program Flexibil</p>
            </div>
            <div className="p-4 bg-purple-500/10 rounded-lg">
              <p className="font-semibold">Buget pentru Învățare</p>
            </div>
            <div className="p-4 bg-purple-500/10 rounded-lg">
              <p className="font-semibold">Evenimente de Echipă</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="container mx-auto px-4 py-16 text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Gata să-ți Transformi Afacerea?</h2>
        <Button 
          onClick={() => window.open('https://calendly.com/aiautomatizari/automatizariai', '_blank')}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          Programează o Consultație
        </Button>
      </motion.section>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default AboutUs;
