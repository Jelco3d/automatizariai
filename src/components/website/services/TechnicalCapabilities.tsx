import { Card, CardContent } from "@/components/ui/card";
import { Database, Cloud, Lock, Cog } from "lucide-react";

export const TechnicalCapabilities = () => {
  return (
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
  );
};