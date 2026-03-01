import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export const PricingPlans = ({
  handleBooking
}: {
  handleBooking: () => void;
}) => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400 text-center mb-12">
        Planuri de Prețuri
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-yellow-400/30 transition-all hover:scale-105 flex flex-col">
          <CardContent className="p-6 text-center flex flex-col flex-1">
            <h3 className="text-xl font-bold text-white mb-2">Începător</h3>
            <p className="text-3xl font-bold text-yellow-400 mb-4">999€</p>
            <ul className="text-white/60 space-y-2 mb-6 text-left flex-1">
              <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-yellow-400/60" />Automatizare de bază a proceselor</li>
              <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-yellow-400/60" />5 fluxuri de lucru automatizate</li>
              <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-yellow-400/60" />Suport prin email</li>
            </ul>
            <Button onClick={handleBooking} className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-semibold">
              Începe Acum
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-yellow-400/30 transition-all hover:scale-105 relative flex flex-col">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-4 py-1 rounded-full text-sm font-semibold">
            Cel Mai Popular
          </div>
          <CardContent className="p-6 text-center flex flex-col flex-1">
            <h3 className="text-xl font-bold text-white mb-2">Profesional</h3>
            <p className="text-3xl font-bold text-yellow-400 mb-4">2.899€</p>
            <ul className="text-white/60 space-y-2 mb-6 text-left flex-1">
              <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-yellow-400/60" />Automatizare avansată</li>
              <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-yellow-400/60" />15 fluxuri de lucru automatizate</li>
              <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-yellow-400/60" />Suport prioritar</li>
              <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-yellow-400/60" />Integrări personalizate</li>
            </ul>
            <Button onClick={handleBooking} className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-semibold">
              Începe Acum
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-yellow-400/30 transition-all hover:scale-105 flex flex-col">
          <CardContent className="p-6 text-center flex flex-col flex-1">
            <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
            <p className="text-3xl font-bold text-yellow-400 mb-4">Personalizat</p>
            <ul className="text-white/60 space-y-2 mb-6 text-left flex-1">
              <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-yellow-400/60" />Suită completă de automatizare</li>
              <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-yellow-400/60" />Fluxuri de lucru nelimitate</li>
              <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-yellow-400/60" />Suport 24/7</li>
              <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-yellow-400/60" />Manager de cont dedicat</li>
            </ul>
            <Button onClick={handleBooking} className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-semibold">
              Contactează-ne
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
