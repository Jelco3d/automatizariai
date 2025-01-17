import { Quote, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const TestimonialsSection = () => {
  console.log("Rendering TestimonialsSection component");
  
  return (
    <div className="container mx-auto px-4 py-16 relative">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 text-center mb-12">What Our Clients Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
          <CardContent className="p-6">
            <Quote className="w-8 h-8 text-purple-400 mb-4" />
            <p className="text-gray-300 mb-4">"The AI automation solutions implemented have reduced our processing time by 70%. Incredible results!"</p>
            <div className="flex items-center gap-2 text-purple-400">
              <Star className="w-4 h-4 fill-current animate-pulse" />
              <Star className="w-4 h-4 fill-current animate-pulse delay-75" />
              <Star className="w-4 h-4 fill-current animate-pulse delay-150" />
              <Star className="w-4 h-4 fill-current animate-pulse delay-200" />
              <Star className="w-4 h-4 fill-current animate-pulse delay-300" />
            </div>
            <p className="text-white font-semibold mt-2">Sarah Johnson</p>
            <p className="text-sm text-gray-400">Operations Manager</p>
          </CardContent>
        </Card>

        <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
          <CardContent className="p-6">
            <Quote className="w-8 h-8 text-purple-400 mb-4" />
            <p className="text-gray-300 mb-4">"The workflow optimization has transformed our business operations. We're now more efficient than ever."</p>
            <div className="flex items-center gap-2 text-purple-400">
              <Star className="w-4 h-4 fill-current animate-pulse" />
              <Star className="w-4 h-4 fill-current animate-pulse delay-75" />
              <Star className="w-4 h-4 fill-current animate-pulse delay-150" />
              <Star className="w-4 h-4 fill-current animate-pulse delay-200" />
              <Star className="w-4 h-4 fill-current animate-pulse delay-300" />
            </div>
            <p className="text-white font-semibold mt-2">Michael Chen</p>
            <p className="text-sm text-gray-400">Tech Director</p>
          </CardContent>
        </Card>

        <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
          <CardContent className="p-6">
            <Quote className="w-8 h-8 text-purple-400 mb-4" />
            <p className="text-gray-300 mb-4">"The data analysis automation has given us insights we never had before. Game-changing for our decision-making."</p>
            <div className="flex items-center gap-2 text-purple-400">
              <Star className="w-4 h-4 fill-current animate-pulse" />
              <Star className="w-4 h-4 fill-current animate-pulse delay-75" />
              <Star className="w-4 h-4 fill-current animate-pulse delay-150" />
              <Star className="w-4 h-4 fill-current animate-pulse delay-200" />
              <Star className="w-4 h-4 fill-current animate-pulse delay-300" />
            </div>
            <p className="text-white font-semibold mt-2">Emily Rodriguez</p>
            <p className="text-sm text-gray-400">Data Analytics Lead</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};