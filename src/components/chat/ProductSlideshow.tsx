import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, ExternalLink, Star } from "lucide-react";

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

interface ProductSlideshowProps {
  products: Product[];
  title?: string;
}

export const ProductSlideshow = ({ products, title = "Produse recomandate" }: ProductSlideshowProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  if (!products || products.length === 0) return null;

  const currentProduct = products[currentIndex];

  return (
    <div className="w-full space-y-3 mt-2">
      <h4 className="text-sm font-medium text-gray-200">{title}</h4>
      
      <Card className="bg-gray-800/50 border-gray-600">
        <CardContent className="p-0">
          {/* Gallery Section */}
          <div className="relative bg-gray-900/50">
            <div className="aspect-[3/2] w-full max-w-[180px] mx-auto overflow-hidden rounded-lg">
              <img
                src={currentProduct.image}
                alt={currentProduct.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.svg";
                }}
              />
            </div>

            {/* Navigation Arrows */}
            {products.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 p-0 bg-black/50 border-gray-500 hover:bg-black/70 backdrop-blur-sm"
                  onClick={prevSlide}
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 p-0 bg-black/50 border-gray-500 hover:bg-black/70 backdrop-blur-sm"
                  onClick={nextSlide}
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </Button>
              </>
            )}

            {/* Slide Indicators */}
            {products.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {products.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentIndex ? "bg-orange-400 shadow-lg" : "bg-white/50"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>
            )}

            {/* Stock Badge */}
            <div className="absolute top-3 right-3">
              <Badge 
                variant={currentProduct.inStock ? "default" : "destructive"}
                className="text-xs shadow-lg"
              >
                {currentProduct.inStock ? "În stoc" : "Stoc epuizat"}
              </Badge>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="p-4 space-y-3">
            <h5 className="text-base font-semibold text-white line-clamp-2">
              {currentProduct.name}
            </h5>

            {/* Price Section */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-orange-400">
                  {currentProduct.price}
                </span>
                {currentProduct.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {currentProduct.originalPrice}
                  </span>
                )}
              </div>
              {currentProduct.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </div>
              )}
            </div>

            {/* Action Button */}
            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium"
              onClick={() => window.open(currentProduct.url, '_blank')}
            >
              <ExternalLink className="w-3 h-3 mr-2" />
              Cumpără acum
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};