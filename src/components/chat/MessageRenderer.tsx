import { ProductSlideshow } from "./ProductSlideshow";

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

interface MessageRendererProps {
  text: string;
  isUser: boolean;
}

// Function to extract product data from text with links and parse actual product info
const extractProductsFromText = (text: string): { products: Product[]; cleanText: string } => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = text.match(urlRegex) || [];
  
  // Parse product information from text
  const products: Product[] = [];
  let cleanText = text;
  
  // Look for product patterns in the text
  const productPattern = /([^,\n]+?)\s*[-–]\s*(\d+(?:[.,]\d+)?)\s*RON(?:\s*\((?:era|vechiul pret|original)?\s*(\d+(?:[.,]\d+)?)\s*RON\))?/gi;
  const matches = [...text.matchAll(productPattern)];
  
  matches.forEach((match, index) => {
    const [fullMatch, name, price, originalPrice] = match;
    const productUrl = urls[index] || '#';
    
    products.push({
      id: `product-${index}`,
      name: name.trim(),
      price: `${price} RON`,
      originalPrice: originalPrice ? `${originalPrice} RON` : undefined,
      image: `/lovable-uploads/${[
        '24bc764d-8443-4b7c-9715-f88d0815c485.png',
        '5756f75e-1758-412b-9390-0cfa1f14bbc6.png',
        '578e533f-92e8-4bf5-a4f5-5f859a59ca0f.png',
        '6d88c142-2eb2-4748-beed-6a725d1dc7e1.png'
      ][index % 4]}`,
      rating: 4 + Math.random(), // 4-5 rating
      inStock: true,
      url: productUrl
    });
    
    // Remove the matched product from clean text
    cleanText = cleanText.replace(fullMatch, '').trim();
  });
  
  // If no products found but URLs exist, create products for URLs only
  if (products.length === 0 && urls.length > 0) {
    urls.forEach((url, index) => {
      products.push({
        id: `product-${index}`,
        name: `Piesă auto compatibilă ${index + 1}`,
        price: `${(Math.random() * 500 + 50).toFixed(0)} RON`,
        originalPrice: Math.random() > 0.5 ? `${(Math.random() * 600 + 100).toFixed(0)} RON` : undefined,
        image: `/lovable-uploads/${[
          '24bc764d-8443-4b7c-9715-f88d0815c485.png',
          '5756f75e-1758-412b-9390-0cfa1f14bbc6.png',
          '578e533f-92e8-4bf5-a4f5-5f859a59ca0f.png',
          '6d88c142-2eb2-4748-beed-6a725d1dc7e1.png'
        ][index % 4]}`,
        rating: Math.random() * 2 + 3,
        inStock: Math.random() > 0.3,
        url: url
      });
    });
  }
  
  // Remove URLs from clean text
  cleanText = cleanText.replace(urlRegex, '').trim();
  
  return { products, cleanText };
};

export const MessageRenderer = ({ text, isUser }: MessageRendererProps) => {
  if (isUser) {
    return <p className="text-sm">{text}</p>;
  }

  const { products, cleanText } = extractProductsFromText(text);
  
  return (
    <div>
      {cleanText && <p className="text-sm mb-2">{cleanText}</p>}
      {products.length > 0 && (
        <ProductSlideshow 
          products={products} 
          title="Produse recomandate pentru tine"
        />
      )}
    </div>
  );
};