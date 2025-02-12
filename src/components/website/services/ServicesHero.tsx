
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const ServicesHero = ({ handleBooking }: { handleBooking: () => void }) => {
  return (
    <div className="container mx-auto px-4 py-16 text-center relative flex flex-col h-[300px]">
      <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
        Serviciile Noastre
      </h1>
      <p className="text-lg text-gray-300 max-w-4xl mx-auto mt-auto">
        Soluții complete de automatizare AI adaptate nevoilor afacerii dumneavoastră
      </p>
    </div>
  );
};
