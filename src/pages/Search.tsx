import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { Navigation } from "@/components/website/Navigation";
import { Footer } from "@/components/website/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Zap, Users, TrendingUp } from "lucide-react";

const searchResults = [
  {
    id: 1,
    title: "Automatizare Procese Business",
    description: "Soluții complete de automatizare pentru optimizarea proceselor de afaceri și creșterea eficienței operaționale.",
    category: "Automatizare",
    tags: ["RPA", "Workflow", "Eficiență"],
    icon: Zap,
    link: "/services"
  },
  {
    id: 2,
    title: "Chatbot-uri AI Personalizate",
    description: "Dezvoltăm chatbot-uri inteligente pentru suport clienți 24/7 și automatizarea comunicării.",
    category: "AI Solutions",
    tags: ["Chatbot", "AI", "Suport Clienți"],
    icon: Bot,
    link: "/services"
  },
  {
    id: 3,
    title: "Analize Predictive",
    description: "Utilizăm machine learning pentru predicții precise și luare de decizii bazate pe date.",
    category: "Analytics",
    tags: ["ML", "Predicții", "Business Intelligence"],
    icon: TrendingUp,
    link: "/services"
  },
  {
    id: 4,
    title: "Consultanță AI Strategy",
    description: "Strategii personalizate de implementare AI pentru transformarea digitală a afacerii tale.",
    category: "Consultanță",
    tags: ["Strategie", "Transformare Digitală", "AI"],
    icon: Users,
    link: "/services"
  }
];

export default function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<string>("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleSearchResults = (results: string) => {
    setSearchResults(results);
    setHasSearched(true);
  };

  const handleBooking = () => {
    window.open('https://calendly.com/aiautomatizari/automatizariai', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2D1B69] to-[#1A1F2C]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 mb-6">
            Căutare Servicii AI
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Descoperă soluțiile noastre de automatizare AI și găsește serviciul perfect pentru afacerea ta
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-16">
            <SearchBar 
              value={searchValue} 
              onChange={handleSearchChange}
              onSearch={handleSearchResults}
            />
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {hasSearched ? (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Rezultate pentru "{searchValue}"
              </h2>
              <div className="mt-6 bg-gray-800/50 rounded-lg p-4">
                <div className="text-gray-200 whitespace-pre-wrap">
                  {searchResults}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Caută piese auto
              </h3>
              <p className="text-muted-foreground mb-8">
                Introdu termenul de căutare în bara de mai sus pentru a găsi piese auto
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-background/5 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 mb-6">
            Nu găsești ce cauți?
          </h3>
          <p className="text-xl text-muted-foreground mb-8">
            Hai să discutăm despre nevoile tale specifice într-o consultație gratuită
          </p>
          <Button 
            onClick={handleBooking}
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg"
          >
            Programează Consultație Gratuită
            <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}