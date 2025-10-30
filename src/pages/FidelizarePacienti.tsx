import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, TrendingUp, Calendar, Users, Star, ArrowRight, Play } from "lucide-react";
import { useEffect } from "react";

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
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Cum pot clinicile dentare din România să-și{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C48C] to-[#1E3A8A]">
              tripleze programările
            </span>{" "}
            fără reclame noi
          </h1>
          
          <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Instalăm pentru tine un sistem complet de fidelizare care face pacienții să revină automat — fără efortul echipei.
          </p>

          {/* Video Player Placeholder */}
          <div className="relative aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden bg-muted shadow-2xl">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#00C48C]/10 to-[#1E3A8A]/10">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors cursor-pointer">
                  <Play className="w-8 h-8 text-primary ml-1" />
                </div>
                <p className="text-sm text-muted-foreground">Video de prezentare – Cum funcționează sistemul</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={handleBookCall}
              size="lg"
              className="bg-gradient-to-r from-[#00C48C] to-[#1E3A8A] hover:opacity-90 text-white text-lg px-8 py-6 h-auto"
            >
              <Calendar className="mr-2" />
              Programează un Call Gratuit
            </Button>
            <p className="text-sm text-muted-foreground">
              Află cum poți crește venitul clinicii cu <strong>+30–50%</strong> în 90 de zile.
            </p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold">
                De ce pierzi bani cu pacienții care nu revin
              </h2>
              <p className="text-xl text-muted-foreground">
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
                <Card key={idx} className="border-destructive/20">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{problem.title}</h3>
                    <p className="text-muted-foreground">{problem.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Comparison Chart */}
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <Card className="border-destructive bg-destructive/5">
                <CardContent className="p-8 text-center space-y-4">
                  <TrendingUp className="w-12 h-12 mx-auto text-destructive rotate-180" />
                  <h3 className="text-xl font-bold text-destructive">Fără Fidelizare</h3>
                  <p className="text-4xl font-bold text-destructive">-40%</p>
                  <p className="text-sm text-muted-foreground">Venit pierdut lunar</p>
                </CardContent>
              </Card>

              <Card className="border-[#00C48C] bg-[#00C48C]/5">
                <CardContent className="p-8 text-center space-y-4">
                  <TrendingUp className="w-12 h-12 mx-auto text-[#00C48C]" />
                  <h3 className="text-xl font-bold text-[#00C48C]">Cu Fidelizare</h3>
                  <p className="text-4xl font-bold text-[#00C48C]">+200%</p>
                  <p className="text-sm text-muted-foreground">Creștere venit</p>
                </CardContent>
              </Card>
            </div>

            <p className="text-center text-lg font-semibold text-destructive">
              Fiecare pacient care nu revine te costă între 400 și 800 RON pierduți.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold">
                Soluția: Sistemul automat de fidelizare pentru clinici dentare
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
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
                <Card key={idx} className="relative overflow-hidden">
                  <CardContent className="p-8 space-y-4">
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#00C48C]/10 to-[#1E3A8A]/10 rounded-full" />
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00C48C] to-[#1E3A8A] flex items-center justify-center text-white font-bold text-xl">
                        {step.step}
                      </div>
                    </div>
                    <step.icon className="w-10 h-10 text-[#00C48C]" />
                    <h3 className="font-bold text-lg">{step.title}</h3>
                    <p className="text-muted-foreground">{step.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <Card className="border-muted-foreground/20">
                <CardContent className="p-8 text-center space-y-4">
                  <h3 className="text-xl font-bold text-muted-foreground">Fără Sistem</h3>
                  <p className="text-lg">Program gol, venit instabil</p>
                  <div className="h-32 flex items-end justify-around gap-2">
                    {[20, 15, 25, 10, 18].map((height, i) => (
                      <div key={i} className="flex-1 bg-muted rounded-t" style={{ height: `${height}%` }} />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#00C48C]">
                <CardContent className="p-8 text-center space-y-4">
                  <h3 className="text-xl font-bold text-[#00C48C]">Cu Sistem</h3>
                  <p className="text-lg">Calendar plin automat</p>
                  <div className="h-32 flex items-end justify-around gap-2">
                    {[75, 85, 90, 80, 95].map((height, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-[#00C48C] to-[#1E3A8A] rounded-t" style={{ height: `${height}%` }} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <p className="text-center text-lg font-semibold text-[#00C48C]">
              Implementare completă în 14 zile, fără bătăi de cap pentru echipa ta.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold">
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
                <Card key={idx} className="relative">
                  <CardContent className="p-8 space-y-4">
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#00C48C] text-[#00C48C]" />
                      ))}
                    </div>
                    <p className="text-2xl font-bold text-[#00C48C]">{testimonial.result}</p>
                    <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                    <div className="pt-4 border-t">
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.clinic}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Offer Stack Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold">
                Totul într-un singur sistem de fidelizare complet
              </h2>
            </div>

            <Card className="border-[#00C48C]/50 bg-gradient-to-br from-[#00C48C]/5 to-[#1E3A8A]/5">
              <CardContent className="p-8 md:p-12 space-y-6">
                {[
                  "Instalare completă sistem",
                  "Automatizări SMS/Email + vouchere digitale",
                  "Dashboard cu reveniri și performanță",
                  "Training pentru recepție și echipă",
                  "Suport 90 zile + optimizări gratuite"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00C48C] to-[#1E3A8A] flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-lg font-medium pt-0.5">{item}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <p className="text-center text-lg font-semibold">
              Totul gata în 14 zile. Dacă în 90 de zile nu vezi dublarea pacienților recurenți,{" "}
              <span className="text-[#00C48C]">lucrăm gratis până o faci.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#00C48C]/10 via-background to-[#1E3A8A]/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">
              Află cât profit pierzi lunar din lipsa fidelizării
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Programează o sesiune gratuită și îți arătăm exact cum poți crește retenția pacienților fără reclame.
            </p>
            <Button 
              onClick={handleBookCall}
              size="lg"
              className="bg-gradient-to-r from-[#00C48C] to-[#1E3A8A] hover:opacity-90 text-white text-xl px-12 py-8 h-auto"
            >
              <Calendar className="mr-2 w-6 h-6" />
              Book a Call Gratuit
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
            <p className="text-sm text-muted-foreground">
              🔒 Consultație 100% gratuită, fără obligații
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
