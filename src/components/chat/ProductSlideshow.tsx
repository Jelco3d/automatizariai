import { useState } from "react";

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

export const ProductSlideshow = ({ products, title }: ProductSlideshowProps) => {
  const handleProductClick = (product: Product) => {
    if (product.url && product.url !== '#') {
      window.open(product.url, '_blank');
    }
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-background/5 backdrop-blur-sm rounded-xl p-6">
      {title && (
        <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
          {title}
        </h3>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
            onClick={() => handleProductClick(product)}
          >
            {/* Product Image */}
            <div className="aspect-square p-4 bg-gray-50 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            </div>
            
            {/* Product Info */}
            <div className="p-3 space-y-2">
              {/* Product Name */}
              <h4 className="text-sm font-medium text-gray-900 line-clamp-2 min-h-[2.5rem]">
                {product.name}
              </h4>
              
              {/* Price */}
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900">
                  € {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    € {product.originalPrice}
                  </span>
                )}
              </div>
              
              {/* Store/Seller */}
              <div className="text-xs text-gray-600">
                AutoShop.ro
              </div>
              
              {/* Shipping */}
              <div className="text-xs text-gray-500">
                + € 6,90 shipping
              </div>
              
              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-xs">
                        {i < Math.floor(product.rating!) ? '★' : '☆'}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">
                    ({Math.floor(product.rating * 10)})
                  </span>
                </div>
              )}
              
              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-xs text-gray-600">
                  {product.inStock ? 'În stoc' : 'Stoc epuizat'}
                </span>
              </div>
              
              {/* Compare/Buy Button */}
              <div className="pt-2">
                <button className="w-full text-xs bg-blue-600 text-white py-2 px-3 rounded hover:bg-blue-700 transition-colors">
                  Cumpără acum
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {products.length > 4 && (
        <div className="text-center mt-6">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Vezi toate produsele →
          </button>
        </div>
      )}
    </div>
  );
};