import { Navigation } from "@/components/website/Navigation";
import { Footer } from "@/components/website/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Calendar, Bell, Star, Shield, Clock } from "lucide-react";
const WhatsAppDemo = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById('demo-form');
    formElement?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const handleBooking = () => {
    window.open('https://calendly.com/aiautomatizari/automatizariai', '_blank');
  };
  return <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2C1F3C] to-[#1A1F2C] relative overflow-hidden">
      <Navigation />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center relative">
        <h1 className="md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 mb-6 text-2xl">
          Oprește pierderea pacienților din cauza răspunsurilor întârziate pe WhatsApp
        </h1>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
          <strong className="rounded-md">Asistentul nostru AI pe WhatsApp răspunde instant, face programări, trimite remindere și cere recenzii</strong> — 
          astfel adaugi peste 5.000€ în tratamente lunar, fără personal suplimentar.
        </p>
        <Button onClick={scrollToForm} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg rounded-lg transform transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
          Programează Demo Gratuit
          <ArrowRight className="ml-2" />
        </Button>
      </section>

      {/* VSL Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 mb-8">
          Vezi cum funcționează Asistentul AI WhatsApp în 4 minute
        </h2>
        <div className="max-w-4xl mx-auto bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-gray-700/50">
          <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-6">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <p className="text-gray-400">Video Demo Placeholder</p>
              <p className="text-sm text-gray-500">Integrează video-ul tău demo aici</p>
            </div>
          </div>
          <div className="text-center">
            <Button onClick={handleBooking} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 text-base rounded-lg px-[15px]">
              Urmărește Demo-ul, apoi Programează un Call Gratuit
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50 text-center">
            <Clock className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Răspunsuri Instant</h3>
            <p className="text-gray-300">Nu mai pierzi pacienți din cauza timpilor lungi de răspuns</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50 text-center">
            <Calendar className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Programări Automate</h3>
            <p className="text-gray-300">Integrate cu calendarul clinicii pentru programări seamless</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50 text-center">
            <Bell className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Remindere</h3>
            <p className="text-gray-300">Scad absențele cu 30% prin remindere automate</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50 text-center">
            <Star className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Recenzii Google</h3>
            <p className="text-gray-300">Crește reputația clinicii prin solicitarea automată de recenzii</p>
          </div>
        </div>
      </section>

      {/* ROI / Proof Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 mb-6">
            Un singur implant plătește 6 luni de serviciu
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Serviciul costă 300€/lună, dar un singur pacient de implant aduce 2.000€. 
            Calculul este simplu: recuperezi investiția cu primul pacient nou.
          </p>
          <div className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-gray-700/50">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-bold text-white">Dr. Maria Popescu</h4>
                <p className="text-gray-400">Clinica Dental Excellence</p>
              </div>
            </div>
            <p className="text-lg text-gray-300 italic">
              "Am programat 15 consultații de implant în 30 de zile cu asistentul AI. 
              ROI-ul a fost incredibil - am recuperat investiția în prima săptămână."
            </p>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-8 rounded-2xl border border-purple-500/30">
            <Shield className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">
              10 pacienți noi în 30 de zile, sau nu plătești
            </h2>
            <p className="text-gray-300">
              Suntem atât de siguri de rezultate, încât îți oferim această garanție. 
              Dacă nu aduci cel puțin 10 pacienți noi în prima lună, nu plătești nimic.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="demo-form" className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 mb-6">
          Ești pregătit să vezi viitorul clinicii tale?
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Programează o demonstrație gratuită de 30 de minute și vezi exact cum 
          asistentul AI va transforma comunicarea cu pacienții tăi.
        </p>
        <Button onClick={handleBooking} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-12 py-6 text-xl rounded-lg transform transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
          Rezervă acum Demo Gratuit
          <ArrowRight className="ml-2" />
        </Button>
      </section>

      <Footer />
    </div>;
};
export default WhatsAppDemo;