import { Navigation } from "@/components/website/Navigation";
import { Footer } from "@/components/website/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Zap, Brain, ArrowRight, Database, Cloud, Lock, Cog, Network, Building2, Shield, Handshake } from "lucide-react";

const Services = () => {
  console.log("Rendering Services page");

  const handleBooking = () => {
    window.open('https://calendly.com/aiautomatizari/30min?month=2024-12', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2C1F3C] to-[#1A1F2C] relative overflow-hidden">
      <Navigation />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center relative">
        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 mb-6">
          Serviciile Noastre
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Soluții complete de automatizare AI adaptate nevoilor afacerii dumneavoastră
        </p>
      </div>

      {/* Detailed Services Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105">
            <CardContent className="p-6">
              <Bot className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Automatizare Procese</h3>
              <p className="text-gray-300 mb-4">Transformați operațiunile de afaceri cu soluții de automatizare bazate pe AI care optimizează fluxurile de lucru și reduc sarcinile manuale.</p>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Optimizarea fluxului de lucru
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Procesarea documentelor
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Automatizarea introducerii datelor
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105">
            <CardContent className="p-6">
              <Brain className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Analiză AI</h3>
              <p className="text-gray-300 mb-4">Utilizați algoritmi AI avansați pentru a analiza datele și a extrage informații acționabile pentru decizii mai bune.</p>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Analiză predictivă
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Recunoașterea tiparelor
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Monitorizare în timp real
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105">
            <CardContent className="p-6">
              <Network className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Servicii de Integrare</h3>
              <p className="text-gray-300 mb-4">Conectați perfect sistemele existente cu soluții AI de ultimă generație pentru productivitate îmbunătățită.</p>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Dezvoltare API
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Integrare sisteme
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Conectori personalizați
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105">
            <CardContent className="p-6">
              <Building2 className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Soluții pentru Întreprinderi</h3>
              <p className="text-gray-300 mb-4">Soluții AI complete adaptate pentru operațiuni de afaceri la scară largă și fluxuri de lucru complexe.</p>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Arhitectură scalabilă
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Securitate pentru întreprinderi
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Suport 24/7
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105">
            <CardContent className="p-6">
              <Shield className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Securitate și Conformitate</h3>
              <p className="text-gray-300 mb-4">Asigurați-vă că implementările AI respectă standardele industriei și cerințele de reglementare.</p>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Protecția datelor
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Audituri de conformitate
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Evaluarea riscurilor
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105">
            <CardContent className="p-6">
              <Handshake className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Servicii de Consultanță</h3>
              <p className="text-gray-300 mb-4">Îndrumare expertă privind strategia AI, implementarea și optimizarea pentru nevoile afacerii dumneavoastră.</p>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Planificare strategică
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Consultanță tehnică
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Suport implementare
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Pricing Plans Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 text-center mb-12">
          Planuri de Prețuri
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-white mb-2">Începător</h3>
              <p className="text-3xl font-bold text-purple-400 mb-4">999€<span className="text-sm text-gray-400">/lună</span></p>
              <ul className="text-gray-300 space-y-2 mb-6 text-left">
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Automatizare de bază a proceselor
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  5 fluxuri de lucru automatizate
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Suport prin email
                </li>
              </ul>
              <Button onClick={handleBooking} className="w-full bg-gradient-to-r from-purple-500 to-pink-500">
                Începe Acum
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm">
              Cel Mai Popular
            </div>
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-white mb-2">Profesional</h3>
              <p className="text-3xl font-bold text-purple-400 mb-4">2.499€<span className="text-sm text-gray-400">/lună</span></p>
              <ul className="text-gray-300 space-y-2 mb-6 text-left">
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Automatizare avansată
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  15 fluxuri de lucru automatizate
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Suport prioritar
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Integrări personalizate
                </li>
              </ul>
              <Button onClick={handleBooking} className="w-full bg-gradient-to-r from-purple-500 to-pink-500">
                Începe Acum
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
              <p className="text-3xl font-bold text-purple-400 mb-4">Personalizat</p>
              <ul className="text-gray-300 space-y-2 mb-6 text-left">
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Suită completă de automatizare
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Fluxuri de lucru nelimitate
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Suport 24/7
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Manager de cont dedicat
                </li>
              </ul>
              <Button onClick={handleBooking} className="w-full bg-gradient-to-r from-purple-500 to-pink-500">
                Contactează-ne
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Case Studies Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 text-center mb-12">
          Studii de Caz
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Gigant E-commerce</h3>
              <p className="text-gray-300 mb-4">Operațiuni de servicii pentru clienți automatizate, rezultând o reducere cu 70% a timpului de răspuns</p>
              <div className="flex justify-between text-purple-400">
                <span>ROI: 300%</span>
                <span>Durată: 3 luni</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Instituție Financiară</h3>
              <p className="text-gray-300 mb-4">Sistem de detectare a fraudelor bazat pe AI implementat, prevenind tranzacții frauduloase în valoare de 2M€</p>
              <div className="flex justify-between text-purple-400">
                <span>ROI: 500%</span>
                <span>Durată: 6 luni</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Technical Capabilities Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 text-center mb-12">
          Capabilități Tehnice
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50">
            <CardContent className="p-6 text-center">
              <Database className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Procesare Date</h3>
              <p className="text-gray-300">Algoritmi avansați pentru procesarea eficientă a datelor</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50">
            <CardContent className="p-6 text-center">
              <Cloud className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Integrare Cloud</h3>
              <p className="text-gray-300">Integrare perfectă cu serviciile cloud</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50">
            <CardContent className="p-6 text-center">
              <Lock className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Securitate</h3>
              <p className="text-gray-300">Protocoale de securitate la nivel de întreprindere</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50">
            <CardContent className="p-6 text-center">
              <Cog className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Personalizare</h3>
              <p className="text-gray-300">Soluții flexibile și personalizabile</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Integration Options Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 text-center mb-12">
          Tehnologii de Integrare
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-lg flex items-center justify-center">
            <span className="text-white">Make (Integromat)</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-lg flex items-center justify-center">
            <span className="text-white">n8n</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-lg flex items-center justify-center">
            <span className="text-white">Relevance AI</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-lg flex items-center justify-center">
            <span className="text-white">Zapier</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-lg flex items-center justify-center">
            <span className="text-white">OpenAI</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-lg flex items-center justify-center">
            <span className="text-white">Langchain</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-lg flex items-center justify-center">
            <span className="text-white">AutoGPT</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-lg flex items-center justify-center">
            <span className="text-white">Power Automate</span>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 mb-6">
          Pregătiți să Vă Transformați Afacerea?
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Programați o consultație gratuită pentru a descoperi cum serviciile noastre de automatizare AI vă pot ajuta afacerea
        </p>
        <Button 
          onClick={handleBooking}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg rounded-lg transform transition-all hover:scale-105"
        >
          Programează Consultația Gratuită
          <ArrowRight className="ml-2" />
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default Services;