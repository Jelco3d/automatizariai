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
  const [filteredResults, setFilteredResults] = useState(searchResults);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    if (!value.trim()) {
      setFilteredResults(searchResults);
      return;
    }

    const filtered = searchResults.filter(result =>
      result.title.toLowerCase().includes(value.toLowerCase()) ||
      result.description.toLowerCase().includes(value.toLowerCase()) ||
      result.category.toLowerCase().includes(value.toLowerCase()) ||
      result.tags.some(tag => tag.toLowerCase().includes(value.toLowerCase()))
    );
    setFilteredResults(filtered);
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
              onChange={handleSearch} 
            />
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              {searchValue ? `Rezultate pentru "${searchValue}"` : 'Toate Serviciile'}
            </h2>
            <p className="text-muted-foreground">
              {filteredResults.length} {filteredResults.length === 1 ? 'rezultat găsit' : 'rezultate găsite'}
            </p>
          </div>

          {filteredResults.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Nu am găsit rezultate
              </h3>
              <p className="text-muted-foreground mb-8">
                Încearcă să cauți cu alți termeni sau explorează toate serviciile noastre
              </p>
              <Button onClick={() => handleSearch("")} variant="outline">
                Afișează Toate Serviciile
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredResults.map((result) => {
                const IconComponent = result.icon;
                return (
                  <Card key={result.id} className="bg-background/10 backdrop-blur-md border-white/20 hover:bg-background/20 transition-all duration-300 group">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <IconComponent className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <Badge variant="secondary" className="mb-2">
                              {result.category}
                            </Badge>
                            <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                              {result.title}
                            </CardTitle>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-muted-foreground mb-4 text-base">
                        {result.description}
                      </CardDescription>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {result.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button className="w-full group-hover:bg-primary/90 transition-colors">
                        Află Mai Multe
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
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