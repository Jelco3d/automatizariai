import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { Navigation } from "@/components/website/Navigation";
import { Footer } from "@/components/website/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { ProductSlideshow } from "@/components/chat/ProductSlideshow";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  rating?: number;
  inStock: boolean;
  url: string;
}

// Function to extract product data from webhook response
const extractProductsFromText = (text: string): Product[] => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = text.match(urlRegex) || [];
  
  const products: Product[] = [];
  
  // Look for Romanian product patterns
  const productPatterns = [
    /([A-Za-z0-9\s\-\/]+?)\s+la\s+prețul\s+de\s+(\d+(?:[.,]\d+)?)\s*lei/gi,
    /([A-Za-z0-9\s\-\/]+?)\s*[—–-]\s*(\d+(?:[.,]\d+)?)\s*lei/gi,
    /([A-Za-z0-9\s\-\/]+?)\s+costă\s+(\d+(?:[.,]\d+)?)\s*lei/gi,
    /([A-Za-z0-9\s\-\/]+?)\s+preț:\s*(\d+(?:[.,]\d+)?)\s*lei/gi,
    /^([A-Za-z0-9\s\-\/]+?)[\n\r]*(\d+(?:[.,]\d+)?)\s*(?:RON|lei)/gmi
  ];
  
  let foundProducts = false;
  
  for (const pattern of productPatterns) {
    const matches = [...text.matchAll(pattern)];
    
    if (matches.length > 0) {
      foundProducts = true;
      matches.forEach((match, index) => {
        const [, name, price] = match;
        const productUrl = urls[index] || '#';
        const cleanName = name.trim().replace(/^(avem|găsit|baterie|piesa?|produs)\s*/i, '');
        
        products.push({
          id: `product-${index}`,
          name: cleanName,
          price: price.includes('RON') ? price : `${price} RON`,
          originalPrice: undefined,
          image: `/lovable-uploads/${[
            '24bc764d-8443-4b7c-9715-f88d0815c485.png',
            '5756f75e-1758-412b-9390-0cfa1f14bbc6.png',
            '578e533f-92e8-4bf5-a4f5-5f859a59ca0f.png',
            '6d88c142-2eb2-4748-beed-6a725d1dc7e1.png'
          ][index % 4]}`,
          rating: 4 + Math.random(),
          inStock: true,
          url: productUrl
        });
      });
      break;
    }
  }
  
  // Special handling for webhook output format with separated lines
  if (!foundProducts) {
    const lines = text.split(/[\n\r]+/).map(line => line.trim()).filter(line => line.length > 0);
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const priceMatch = line.match(/(.+?)\s+(\d+(?:[.,]\d+)?)\s*(RON|lei)/i);
      if (priceMatch) {
        const [, name, price, currency] = priceMatch;
        const productUrl = urls[products.length] || '#';
        
        products.push({
          id: `product-${products.length}`,
          name: name.trim(),
          price: `${price} ${currency.toUpperCase() === 'LEI' ? 'RON' : currency}`,
          originalPrice: undefined,
          image: `/lovable-uploads/${[
            '24bc764d-8443-4b7c-9715-f88d0815c485.png',
            '5756f75e-1758-412b-9390-0cfa1f14bbc6.png',
            '578e533f-92e8-4bf5-a4f5-5f859a59ca0f.png',
            '6d88c142-2eb2-4748-beed-6a725d1dc7e1.png'
          ][products.length % 4]}`,
          rating: 4 + Math.random(),
          inStock: true,
          url: productUrl
        });
      }
    }
  }
  
  return products;
};

export default function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (value: string) => {
    setSearchValue(value);
    
    if (!value.trim()) {
      setProducts([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://ejelco8.app.n8n.cloud/webhook-test/a2020483-44a2-4eff-9bfd-b6b73e42fc54', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: value,
          vin: "" 
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      let responseText = await response.text();
      console.log("Webhook response:", responseText);

      const extractedProducts = extractProductsFromText(responseText);
      setProducts(extractedProducts);
    } catch (error) {
      console.error('Error calling webhook:', error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
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
          {searchValue && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Rezultate pentru "{searchValue}"
              </h2>
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">⏳</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Se caută produse...
              </h3>
              <p className="text-muted-foreground">
                Te rugăm să aștepți în timp ce găsim produsele potrivite pentru tine
              </p>
            </div>
          ) : searchValue && products.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Nu am găsit produse
              </h3>
              <p className="text-muted-foreground mb-8">
                Încearcă să cauți cu alți termeni
              </p>
            </div>
          ) : products.length > 0 ? (
            <div className="max-w-4xl mx-auto">
              <ProductSlideshow 
                products={products} 
                title="Produse găsite pentru căutarea ta"
              />
            </div>
          ) : !searchValue && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Căutare Produse Auto
              </h3>
              <p className="text-muted-foreground">
                Introdu termenul de căutare pentru a găsi produsele de care ai nevoie
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
      <ChatWidget />
    </div>
  );
}