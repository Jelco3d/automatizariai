import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

export const TestimonialsSection = () => {
  return (
    <div className="container mx-auto px-4 py-8 relative">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 text-center mb-12">Ce Spun Clienții Noștri</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
          <CardContent className="p-6">
            <Quote className="w-8 h-8 text-purple-400 mb-4" />
            <p className="text-gray-300 mb-4">"Soluțiile de automatizare AI implementate au redus timpul nostru de procesare cu 70%. Rezultate incredibile!"</p>
            <div className="flex items-center gap-2 text-purple-400">
              <Star className="w-4 h-4 fill-current animate-pulse" />
              <Star className="w-4 h-4 fill-current animate-pulse delay-75" />
              <Star className="w-4 h-4 fill-current animate-pulse delay-150" />
              <Star className="w-4 h-4 fill-current animate-pulse delay-200" />
              <Star className="w-4 h-4 fill-current animate-pulse delay-300" />
            </div>
            <p className="text-white font-semibold mt-2">Ana Maria Popescu</p>
            <p className="text-sm text-gray-400">Manager Operațiuni</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
          <CardContent className="p-6">
            <Quote className="w-8 h-8 text-purple-400 mb-4" />
            <p className="text-gray-300 mb-4">"Optimizarea fluxului de lucru ne-a transformat operațiunile de afaceri. Suntem mai eficienți ca niciodată."</p>
            <div className="flex items-center gap-2 text-purple-400">
              <Star className="w-4 h-4 fill-current animate-pulse" />
              <Star className="w-4 h-4 fill-current animate-pulse delay-75" />
              <Star className="w-4 h-4 fill-current animate-pulse delay-150" />
              <Star className="w-4 h-4 fill-current animate-pulse delay-200" />
              <Star className="w-4 h-4 fill-current animate-pulse delay-300" />
            </div>
            <p className="text-white font-semibold mt-2">Mihai Ionescu</p>
            <p className="text-sm text-gray-400">Director Tehnic</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
          <CardContent className="p-6">
            <Quote className="w-8 h-8 text-purple-400 mb-4" />
            <p className="text-gray-300 mb-4">"Automatizarea analizei datelor ne-a oferit perspective pe care nu le-am avut niciodată înainte. A schimbat complet modul în care luăm decizii."</p>
            <div className="flex items-center gap-2 text-purple-400">
              <Star className="w-4 h-4 fill-current animate-pulse" />
              <Star className="w-4 h-4 fill-current animate-pulse delay-75" />
              <Star className="w-4 h-4 fill-current animate-pulse delay-150" />
              <Star className="w-4 h-4 fill-current animate-pulse delay-200" />
              <Star className="w-4 h-4 fill-current animate-pulse delay-300" />
            </div>
            <p className="text-white font-semibold mt-2">Elena Dumitrescu</p>
            <p className="text-sm text-gray-400">Lead Analiză Date</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};