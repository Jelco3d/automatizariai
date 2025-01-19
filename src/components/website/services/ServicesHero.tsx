import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const ServicesHero = ({ handleBooking }: { handleBooking: () => void }) => {
  return (
    <div className="container mx-auto px-4 py-16 text-center relative">
      <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 mb-6">
        Serviciile Noastre
      </h1>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
        Soluții complete de automatizare AI adaptate nevoilor afacerii dumneavoastră
      </p>
    </div>
  );
};