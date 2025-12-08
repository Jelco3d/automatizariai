import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/website/Navigation";
import { Footer } from "@/components/website/Footer";
import { QrCode, Car, TrendingUp, Users, Settings, Shield, Clock, ArrowRight, Bell, CheckCircle2 } from "lucide-react";
const ShowroomVSL = () => {
  const handleBooking = () => {
    window.open('https://calendly.com/aiautomatizari/automatizari-ai', '_blank');
  };
  return <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2C1F3C] to-[#1A1F2C] text-foreground relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-4 md:left-10 w-48 md:w-72 h-48 md:h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-4 md:right-10 w-64 md:w-96 h-64 md:h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{
        animationDelay: '1s'
      }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-purple-600/5 rounded-full blur-3xl" />
      </div>

      <Navigation />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-12 sm:pb-16 text-center py-[10px]">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-6 sm:mb-8">
            <Car className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
            <span className="text-xs sm:text-sm text-purple-300">Pentru Showroom-uri Auto</span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-2">
            <span className="text-white">Showroom-ul Tău Pierde  Lunar Între </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
5.000 și 20.000€</span>
            <span className="text-white"></span>
            <br />
            <span className="text-gray-400">Fără Să-ți Dai Seama.</span>
          </h1>
          
          <p className="text-base sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-12 px-2">Află cum Un Simplu QR Cod Și Un
sistem automat pot crește vânzările cu 20–40% în 90 de zile.<span className="text-purple-400 font-semibold">QR</span> și un <span className="text-pink-400 font-semibold">sistem automat</span> pot crește vânzările cu <span className="text-green-400 font-bold">20–40%</span> în 90 de zile.
          </p>

          {/* 3 Key Benefits */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-6 mb-8 sm:mb-12 px-2">
            
            
            
          </div>

          <Button onClick={handleBooking} size="lg" className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 sm:px-10 py-6 sm:py-7 text-base sm:text-lg rounded-xl transform transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
            <span className="text-sm sm:text-base">Programează Sesiune Gratuită</span>
            <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </section>

        {/* Video Section */}
        <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="max-w-4xl mx-auto rounded-sm shadow-md opacity-100 border-0">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-white mb-6 sm:mb-8">
              Vezi cum funcționează sistemul
            </h2>
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20">
              <div className="aspect-video">
                <iframe src="https://www.veed.io/embed/a5102854-01e9-4bfc-ba1e-249e3931cdd6" width="100%" height="100%" frameBorder="0" title="Showroom VSL Video" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen className="w-full h-full" />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-3 sm:mb-4">
            Cum Funcționează?
          </h2>
          <p className="text-sm sm:text-base text-gray-400 text-center mb-10 sm:mb-16 max-w-2xl mx-auto px-2">
            Un sistem simplu care transformă vizitatorii în clienți, fără efort din partea ta.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[{
            icon: QrCode,
            step: "01",
            title: "Scanare QR",
            description: "Clientul scanează QR-ul de lângă mașină cu telefonul"
          }, {
            icon: Car,
            step: "02",
            title: "Informații Instant",
            description: "Primește toate detaliile + ofertă personalizată pe loc"
          }, {
            icon: Bell,
            step: "03",
            title: "Urmărire Automată",
            description: "Sistemul urmărește automat lead-urile și le reamintește"
          }, {
            icon: CheckCircle2,
            step: "04",
            title: "Notificare Vânzare",
            description: "Primești notificare când clientul e gata să cumpere"
          }].map((item, index) => <div key={index} className="relative bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-5 sm:p-6 hover:bg-white/10 transition-all group">
                <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                  {item.step}
                </div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-purple-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-1.5 sm:mb-2">{item.title}</h3>
                <p className="text-sm sm:text-base text-gray-400">{item.description}</p>
              </div>)}
          </div>
        </section>

        {/* ROI Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
              <div className="py-4 sm:py-0">
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-green-400" />
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-1 sm:mb-2">
                  20-40%
                </div>
                <p className="text-sm sm:text-base text-gray-400">Creștere Vânzări</p>
              </div>
              <div className="py-4 sm:py-0 border-y sm:border-y-0 sm:border-x border-white/10">
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1 sm:mb-2">
                  90 zile
                </div>
                <p className="text-sm sm:text-base text-gray-400">Timp de Implementare</p>
              </div>
              <div className="py-4 sm:py-0">
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400" />
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-1 sm:mb-2">
                  0€
                </div>
                <p className="text-sm sm:text-base text-gray-400">Risc pentru Tine</p>
              </div>
            </div>
          </div>
        </section>

        {/* Urgency & CTA Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-6 sm:mb-8 animate-pulse">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400" />
            <span className="text-xs sm:text-sm text-red-300 font-semibold">3 locuri disponibile luna aceasta</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 px-2">
            Aplică Acum pentru o Sesiune de Strategie Gratuită
          </h2>
          
          <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto mb-8 sm:mb-10 px-2">
            Descoperă exact cum poți implementa acest sistem în showroom-ul tău și câți bani pierzi în fiecare lună.
          </p>

          <Button onClick={handleBooking} size="lg" className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 sm:px-12 py-6 sm:py-8 text-lg sm:text-xl rounded-xl transform transition-all hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30">
            Programează Sesiune Gratuită
            <ArrowRight className="ml-2 w-5 h-5 sm:w-6 sm:h-6 animate-bounce" />
          </Button>

          <p className="mt-4 sm:mt-6 text-gray-500 text-xs sm:text-sm">
            Fără obligații. Fără costuri ascunse. 100% gratuit.
          </p>
        </section>
      </main>

      <Footer />
    </div>;
};
export default ShowroomVSL;