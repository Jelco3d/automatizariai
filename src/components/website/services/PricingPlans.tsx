import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
export const PricingPlans = ({
  handleBooking
}: {
  handleBooking: () => void;
}) => {
  return <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 text-center mb-12">
        Planuri de Prețuri
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105 flex flex-col">
          <CardContent className="p-6 text-center flex flex-col flex-1">
            <h3 className="text-xl font-bold text-white mb-2">Începător</h3>
            <p className="text-3xl font-bold text-purple-400 mb-4">999€</p>
            <ul className="text-gray-300 space-y-2 mb-6 text-left flex-1">
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

        <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105 relative flex flex-col">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm">
            Cel Mai Popular
          </div>
          <CardContent className="p-6 text-center flex flex-col flex-1">
            <h3 className="text-xl font-bold text-white mb-2">Profesional</h3>
            <p className="text-3xl font-bold text-purple-400 mb-4">2.899€</p>
            <ul className="text-gray-300 space-y-2 mb-6 text-left flex-1">
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

        <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105 flex flex-col">
          <CardContent className="p-6 text-center flex flex-col flex-1">
            <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
            <p className="text-3xl font-bold text-purple-400 mb-4">Personalizat</p>
            <ul className="text-gray-300 space-y-2 mb-6 text-left flex-1">
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
    </div>;
};