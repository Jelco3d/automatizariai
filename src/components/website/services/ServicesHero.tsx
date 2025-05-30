import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
export const ServicesHero = ({
  handleBooking
}: {
  handleBooking: () => void;
}) => {
  return <div className="container mx-auto px-4 py-16 text-center relative flex flex-col h-[300px]">
      <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
        Serviciile Noastre
      </h1>
      <p className="text-gray-300 max-w-3xl mx-auto mt-auto font-semibold px-0 text-xl">Soluții Complete De Automatizare AI Adaptate Nevoilor Afacerii Dumneavoastră</p>
    </div>;
};