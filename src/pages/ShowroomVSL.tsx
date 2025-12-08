import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/website/Navigation";
import { Footer } from "@/components/website/Footer";
import { 
  QrCode, 
  Car, 
  TrendingUp, 
  Users, 
  Settings, 
  Shield, 
  Clock, 
  ArrowRight,
  Bell,
  CheckCircle2
} from "lucide-react";

const ShowroomVSL = () => {
  const handleBooking = () => {
    window.open('https://calendly.com/aiautomatizari/automatizari-ai', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2C1F3C] to-[#1A1F2C] text-foreground relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-3xl" />
      </div>

      <Navigation />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-32 pb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-8">
            <Car className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Pentru Showroom-uri Auto</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">Showroom-ul tău pierde între </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">5.000 și 20.000€</span>
            <span className="text-white"> pe lună…</span>
            <br />
            <span className="text-gray-400">fără să-ți dai seama.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
            Află cum un simplu <span className="text-purple-400 font-semibold">QR</span> și un <span className="text-pink-400 font-semibold">sistem automat</span> pot crește vânzările cu <span className="text-green-400 font-bold">20–40%</span> în 90 de zile.
          </p>

          {/* 3 Key Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-3">
              <Users className="w-5 h-5 text-purple-400" />
              <span className="text-gray-300">Fără angajați în plus</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-3">
              <Settings className="w-5 h-5 text-pink-400" />
              <span className="text-gray-300">Fără schimbări complicate</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-3">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-gray-300">Fără riscuri</span>
            </div>
          </div>

          <Button 
            onClick={handleBooking}
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-10 py-7 text-lg rounded-xl transform transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
          >
            Programează Sesiune de Strategie Gratuită
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </section>

        {/* How It Works Section */}
        <section className="container mx-auto px-4 py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
            Cum Funcționează?
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Un sistem simplu care transformă vizitatorii în clienți, fără efort din partea ta.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: QrCode,
                step: "01",
                title: "Scanare QR",
                description: "Clientul scanează QR-ul de lângă mașină cu telefonul"
              },
              {
                icon: Car,
                step: "02", 
                title: "Informații Instant",
                description: "Primește toate detaliile + ofertă personalizată pe loc"
              },
              {
                icon: Bell,
                step: "03",
                title: "Urmărire Automată",
                description: "Sistemul urmărește automat lead-urile și le reamintește"
              },
              {
                icon: CheckCircle2,
                step: "04",
                title: "Notificare Vânzare",
                description: "Primești notificare când clientul e gata să cumpere"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group"
              >
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {item.step}
                </div>
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ROI Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="flex items-center justify-center mb-4">
                  <TrendingUp className="w-10 h-10 text-green-400" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-2">
                  20-40%
                </div>
                <p className="text-gray-400">Creștere Vânzări</p>
              </div>
              <div>
                <div className="flex items-center justify-center mb-4">
                  <Clock className="w-10 h-10 text-purple-400" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                  90 zile
                </div>
                <p className="text-gray-400">Timp de Implementare</p>
              </div>
              <div>
                <div className="flex items-center justify-center mb-4">
                  <Shield className="w-10 h-10 text-blue-400" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
                  0€
                </div>
                <p className="text-gray-400">Risc pentru Tine</p>
              </div>
            </div>
          </div>
        </section>

        {/* Urgency & CTA Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-4 py-2 mb-8 animate-pulse">
            <Clock className="w-4 h-4 text-red-400" />
            <span className="text-sm text-red-300 font-semibold">3 locuri disponibile luna aceasta</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Aplică Acum pentru o Sesiune de Strategie Gratuită
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Descoperă exact cum poți implementa acest sistem în showroom-ul tău și câți bani pierzi în fiecare lună.
          </p>

          <Button 
            onClick={handleBooking}
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-12 py-8 text-xl rounded-xl transform transition-all hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30"
          >
            Programează Sesiune Gratuită
            <ArrowRight className="ml-2 w-6 h-6 animate-bounce" />
          </Button>

          <p className="mt-6 text-gray-500 text-sm">
            Fără obligații. Fără costuri ascunse. 100% gratuit.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ShowroomVSL;
