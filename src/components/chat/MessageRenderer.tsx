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

// Function to extract product data from text with links
const extractProductsFromText = (text: string): { products: Product[]; cleanText: string } => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = text.match(urlRegex) || [];
  
  // Mock products for demonstration - in real implementation, you'd fetch this data
  const mockProducts: Product[] = urls.map((url, index) => ({
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
    rating: Math.random() * 2 + 3, // 3-5 rating
    inStock: Math.random() > 0.3,
    url: url
  }));

  // Remove URLs from text to clean it up
  const cleanText = text.replace(urlRegex, '').trim();
  
  return { products: mockProducts, cleanText };
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