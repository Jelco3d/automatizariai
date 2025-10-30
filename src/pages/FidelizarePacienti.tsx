import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, TrendingUp, Calendar, Users, Star, ArrowRight, Play } from "lucide-react";
import { useEffect } from "react";
import { Navigation } from "@/components/website/Navigation";
import { Footer } from "@/components/website/Footer";

export default function FidelizarePacienti() {
  const handleBookCall = () => {
    window.open('https://calendly.com/aiautomatizari/automatizari-ai', '_blank');
  };

  useEffect(() => {
    document.title = "Sistem de fidelizare automată pentru clinici dentare – Crește profitul fără reclame";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Implementăm sisteme automate care fac pacienții să revină singuri. +30–50% profit în 90 zile. Programează un call gratuit.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] via-[#2C1F3C] to-[#1A1F2C] relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '700ms' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1000ms' }}></div>
      </div>

      <Navigation />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Cum pot clinicile dentare din România să-și{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
              tripleze programările
            </span>{" "}
            fără reclame noi
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Instalăm pentru tine un sistem complet de fidelizare care face pacienții să revină automat — fără efortul echipei.
          </p>

          {/* Video Player Placeholder */}
          <div className="relative aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden bg-gray-900/50 backdrop-blur-sm shadow-2xl border border-purple-500/20">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-600/80 to-pink-600/80">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-white/90 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer hover:bg-white">
                  <Play className="w-8 h-8 text-purple-600 ml-1" />
                </div>
                <p className="text-white text-lg font-medium">Video de prezentare – Cum funcționează sistemul</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={handleBookCall}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg px-8 py-6 h-auto transform transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
            >
              <Calendar className="mr-2" />
              Programează un Call Gratuit
            </Button>
            <p className="text-sm text-gray-400">
              Află cum poți crește venitul clinicii cu <strong className="text-purple-400">+30–50%</strong> în 90 de zile.
            </p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 md:py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
                De ce pierzi bani cu pacienții care nu revin
              </h2>
              <p className="text-xl text-gray-300">
                Ai pacienți noi, dar programul e gol luna următoare? Iată de ce.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Pacienții vin o dată și dispar", desc: "Fără un sistem de urmărire, 70% dintre pacienți nu revin niciodată" },
                { title: "Reclamele devin din ce în ce mai scumpe", desc: "Costul pe achiziție crește lunar, profitul scade" },
                { title: "Lipsă de follow-up automatizat", desc: "Echipa ta nu are timp să sune fiecare pacient" },
                { title: "Fără recompense pentru revenire", desc: "Pacienții nu au niciun motiv să revină la tine" },
                { title: "Nicio evidență clară a ratelor de retenție", desc: "Nu știi câți pacienți pierzi lunar și de ce" }
              ].map((problem, idx) => (
                <Card key={idx} className="bg-gray-900/50 backdrop-blur-sm border-2 border-purple-500/20 hover:border-purple-400/50 transition-all hover:shadow-lg hover:shadow-purple-500/10">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2 text-gray-100">{problem.title}</h3>
                    <p className="text-gray-400">{problem.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Comparison Chart */}
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <Card className="bg-gradient-to-br from-red-900/30 to-red-800/20 backdrop-blur-sm border-2 border-red-500/30">
                <CardContent className="p-8 text-center space-y-4">
                  <TrendingUp className="w-12 h-12 mx-auto text-red-400 rotate-180" />
                  <h3 className="text-xl font-bold text-red-400">Fără Fidelizare</h3>
                  <p className="text-4xl font-bold text-red-400">-40%</p>
                  <p className="text-sm text-gray-400">Venit pierdut lunar</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 backdrop-blur-sm border-2 border-purple-500/30">
                <CardContent className="p-8 text-center space-y-4">
                  <TrendingUp className="w-12 h-12 mx-auto text-purple-400" />
                  <h3 className="text-xl font-bold text-purple-400">Cu Fidelizare</h3>
                  <p className="text-4xl font-bold text-purple-400">+200%</p>
                  <p className="text-sm text-gray-400">Creștere venit</p>
                </CardContent>
              </Card>
            </div>

            <p className="text-center text-lg font-semibold text-gray-300">
              Fiecare pacient care nu revine te costă între <span className="text-red-400">400 și 800 RON</span> pierduți.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 md:py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
                Soluția: Sistemul automat de fidelizare pentru clinici dentare
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Transformă pacienții ocazionali în pacienți loiali, fără să-ți schimbi modul de lucru.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  step: "1",
                  title: "Pacientul primește cont + voucher digital",
                  desc: "La prima vizită, pacientul primește automat acces la contul personal și primul voucher"
                },
                {
                  icon: Calendar,
                  step: "2",
                  title: "Sistemul trimite remindere și oferte personalizate",
                  desc: "Mesaje automate cu oferte personalizate pe baza istoricului de tratamente"
                },
                {
                  icon: TrendingUp,
                  step: "3",
                  title: "Pacientul revine și rezervă automat următoarea vizită",
                  desc: "Programul se umple singur, fără efort din partea echipei tale"
                }
              ].map((step, idx) => (
                <Card key={idx} className="relative overflow-hidden bg-gray-900/50 backdrop-blur-sm border-2 border-purple-500/20 hover:border-purple-400/50 transition-all hover:shadow-xl hover:shadow-purple-500/20 hover:scale-105">
                  <CardContent className="p-8 space-y-4">
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl" />
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-500/50">
                        {step.step}
                      </div>
                    </div>
                    <step.icon className="w-10 h-10 text-purple-400" />
                    <h3 className="font-bold text-lg text-gray-100">{step.title}</h3>
                    <p className="text-gray-400">{step.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <Card className="bg-gray-900/30 backdrop-blur-sm border-2 border-gray-700/50">
                <CardContent className="p-8 text-center space-y-4">
                  <h3 className="text-xl font-bold text-gray-300">Fără Sistem</h3>
                  <p className="text-lg text-gray-400">Program gol, venit instabil</p>
                  <div className="h-32 flex items-end justify-around gap-2">
                    {[20, 15, 25, 10, 18].map((height, i) => (
                      <div key={i} className="flex-1 bg-gray-700/50 rounded-t" style={{ height: `${height}%` }} />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border-2 border-purple-500/30">
                <CardContent className="p-8 text-center space-y-4">
                  <h3 className="text-xl font-bold text-purple-400">Cu Sistem</h3>
                  <p className="text-lg text-gray-300">Calendar plin automat</p>
                  <div className="h-32 flex items-end justify-around gap-2">
                    {[75, 85, 90, 80, 95].map((height, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t shadow-lg" style={{ height: `${height}%` }} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <p className="text-center text-lg font-semibold text-gray-300">
              Implementare completă în <span className="text-purple-400">14 zile</span>, fără bătăi de cap pentru echipa ta.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
                Clinici care folosesc deja sistemul nostru
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  clinic: "DentalArt Cluj",
                  result: "+85% creștere pacienți recurenți",
                  quote: "Programul clinicii s-a umplut automat în doar 30 de zile. Sistemul face toată treaba pentru noi.",
                  name: "Dr. Maria Popescu"
                },
                {
                  clinic: "SmileStudio Iași",
                  result: "+100.000 RON venit suplimentar în 3 luni",
                  quote: "Am dublat veniturile fără să mărim bugetul de marketing. Pacienții revin singuri.",
                  name: "Dr. Alexandru Ionescu"
                },
                {
                  clinic: "PremiumDent Timișoara",
                  result: "Calendar complet ocupat 6 săptămâni în avans",
                  quote: "Nu mai avem nicio zi liberă în calendar. Sistemul de fidelizare a schimbat complet businessul nostru.",
                  name: "Dr. Ana Marinescu"
                }
              ].map((testimonial, idx) => (
                <Card key={idx} className="relative bg-gray-900/50 backdrop-blur-sm border-2 border-purple-500/20 hover:border-purple-400/50 transition-all hover:shadow-lg hover:shadow-purple-500/20">
                  <CardContent className="p-8 space-y-4">
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-purple-400 text-purple-400" />
                      ))}
                    </div>
                    <p className="text-2xl font-bold text-purple-400">{testimonial.result}</p>
                    <p className="text-gray-400 italic">"{testimonial.quote}"</p>
                    <div className="pt-4 border-t border-purple-500/20">
                      <p className="font-semibold text-gray-100">{testimonial.name}</p>
                      <p className="text-sm text-gray-400">{testimonial.clinic}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Offer Stack Section */}
      <section className="py-16 md:py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
                Totul într-un singur sistem de fidelizare complet
              </h2>
            </div>

            <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-sm border-4 border-purple-500/50 shadow-2xl shadow-purple-500/20">
              <CardContent className="p-8 md:p-12 space-y-6">
                {[
                  "Instalare completă sistem",
                  "Automatizări SMS/Email + vouchere digitale",
                  "Dashboard cu reveniri și performanță",
                  "Training pentru recepție și echipă",
                  "Suport 90 zile + optimizări gratuite"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/50">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-lg font-medium pt-0.5 text-gray-200">{item}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <p className="text-center text-lg font-semibold text-gray-300">
              Totul gata în 14 zile. Dacă în 90 de zile nu vezi dublarea pacienților recurenți,{" "}
              <span className="text-purple-400">lucrăm gratis până o faci.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8 bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-sm rounded-2xl p-12 border-2 border-purple-500/30">
            <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
              Află cât profit pierzi lunar din lipsa fidelizării
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Programează o sesiune gratuită și îți arătăm exact cum poți crește retenția pacienților fără reclame.
            </p>
            <Button 
              onClick={handleBookCall}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xl px-12 py-8 h-auto shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all hover:scale-105"
            >
              <Calendar className="mr-2 w-6 h-6" />
              Book a Call Gratuit
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
            <p className="text-sm text-gray-400">
              🔒 Consultație 100% gratuită, fără obligații
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
