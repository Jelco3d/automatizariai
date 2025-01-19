import { motion } from "framer-motion";
import { Navigation } from "@/components/website/Navigation";
import { Footer } from "@/components/website/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const AboutUs = () => {
  console.log("Rendering AboutUs page");

  const teamMembers = [
    {
      name: "John Smith",
      role: "CEO & Fondator",
      image: "/placeholder.svg",
    },
    {
      name: "Sarah Johnson",
      role: "Director Dezvoltare AI",
      image: "/placeholder.svg",
    },
    {
      name: "Michael Chen",
      role: "Director Tehnic",
      image: "/placeholder.svg",
    },
  ];

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white overflow-hidden">
      <Navigation />
      
      {/* Company Story Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 pt-24 pb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Povestea Noastră
        </h1>
        <div className="max-w-3xl mx-auto text-gray-300 space-y-4">
          <p>
            Fondată în 2020, compania noastră s-a născut dintr-o viziune de a revoluționa procesele de afaceri prin automatizare AI. Ce a început ca o mică echipă de inovatori s-a transformat într-o forță conducătoare în industria automatizării.
          </p>
          <p>
            Astăzi, continuăm să împingem limitele posibilului cu AI, ajutând afaceri din întreaga lume să-și transforme operațiunile și să atingă o eficiență fără precedent.
          </p>
        </div>
      </motion.section>

      {/* Team Members Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="container mx-auto px-4 py-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Echipa Noastră</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name} className="bg-[#2A2F3C]/50 border-purple-500/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-32 h-32 rounded-full mx-auto mb-4 bg-purple-500/20"
                />
                <h3 className="text-xl font-semibold text-center text-purple-400">{member.name}</h3>
                <p className="text-center text-gray-400">{member.role}</p>
              </CardContent>
            </Card>
          ))}
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
          onClick={() => window.open('https://calendly.com/aiautomatizari/30min?month=2024-12', '_blank')}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          Programează o Consultație
        </Button>
      </motion.section>

      <Footer />
    </div>
  );
};

export default AboutUs;