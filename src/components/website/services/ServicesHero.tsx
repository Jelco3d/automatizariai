import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
export const ServicesHero = ({
  handleBooking
}: {
  handleBooking: () => void;
}) => {
  return <div className="container mx-auto text-center relative flex flex-col h-[200px] py-0 px-0 rounded">
      <h1 className="md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 text-3xl my-0 py-[2px]">
        Serviciile Noastre
      </h1>
      <p className="text-gray-300 max-w-3xl mt-auto font-semibold px-0 mx-0 my-[25px] text-lg">Soluții Complete De Automatizare AI AdaptateAfacerii Tale</p>
    </div>;
};