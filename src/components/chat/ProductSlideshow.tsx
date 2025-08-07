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
        <CardContent className="p-4">
          <div className="relative">
            {/* Product Image */}
            <div className="aspect-square w-full max-w-[200px] mx-auto mb-3 bg-gray-700 rounded-lg overflow-hidden">
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
                  className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 bg-gray-800/80 border-gray-600 hover:bg-gray-700"
                  onClick={prevSlide}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 bg-gray-800/80 border-gray-600 hover:bg-gray-700"
                  onClick={nextSlide}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-2">
            <h5 className="text-sm font-medium text-white line-clamp-2">
              {currentProduct.name}
            </h5>

            {/* Rating */}
            {currentProduct.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-gray-300">{currentProduct.rating}</span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-orange-400">
                {currentProduct.price}
              </span>
              {currentProduct.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {currentProduct.originalPrice}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <Badge 
              variant={currentProduct.inStock ? "default" : "destructive"}
              className="text-xs"
            >
              {currentProduct.inStock ? "În stoc" : "Stoc epuizat"}
            </Badge>

            {/* View Product Button */}
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-3 bg-transparent border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white"
              onClick={() => window.open(currentProduct.url, '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Vezi produsul
            </Button>
          </div>

          {/* Slide Indicators */}
          {products.length > 1 && (
            <div className="flex justify-center gap-1 mt-3">
              {products.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-orange-400" : "bg-gray-600"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};