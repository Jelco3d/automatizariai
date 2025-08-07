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
  
  // Look for Romanian product patterns like "MOTUL 5100 15W-50 4T la prețul de 155.5 lei"
  const productPatterns = [
    // Pattern 1: "Product Name la prețul de X lei"
    /([A-Za-z0-9\s\-\/]+?)\s+la\s+prețul\s+de\s+(\d+(?:[.,]\d+)?)\s*lei/gi,
    // Pattern 2: "Product Name — X lei" or "Product Name - X lei"
    /([A-Za-z0-9\s\-\/]+?)\s*[—–-]\s*(\d+(?:[.,]\d+)?)\s*lei/gi,
    // Pattern 3: "Product Name costă X lei"
    /([A-Za-z0-9\s\-\/]+?)\s+costă\s+(\d+(?:[.,]\d+)?)\s*lei/gi,
    // Pattern 4: "Product Name preț: X lei"
    /([A-Za-z0-9\s\-\/]+?)\s+preț:\s*(\d+(?:[.,]\d+)?)\s*lei/gi,
    // Pattern 5: Lines with product info - split by newlines
    /^([A-Za-z0-9\s\-\/]+?)[\n\r]*(\d+(?:[.,]\d+)?)\s*(?:RON|lei)/gmi
  ];
  
  let foundProducts = false;
  
  // Try each pattern to find products
  for (const pattern of productPatterns) {
    const matches = [...text.matchAll(pattern)];
    
    if (matches.length > 0) {
      foundProducts = true;
      matches.forEach((match, index) => {
        const [fullMatch, name, price] = match;
        const productUrl = urls[index] || '#';
        
        // Clean up the product name
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
          rating: 4 + Math.random(), // 4-5 rating
          inStock: true,
          url: productUrl
        });
        
        // Remove the matched product from clean text
        cleanText = cleanText.replace(fullMatch, '').trim();
      });
      break; // Stop after finding matches with first successful pattern
    }
  }
  
  // Special handling for webhook output format with separated lines
  if (!foundProducts) {
    const lines = text.split(/[\n\r]+/).map(line => line.trim()).filter(line => line.length > 0);
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Check if line contains product info with price
      const priceMatch = line.match(/(.+?)\s+(\d+(?:[.,]\d+)?)\s*(RON|lei)/i);
      if (priceMatch) {
        const [fullMatch, name, price, currency] = priceMatch;
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
        
        cleanText = cleanText.replace(fullMatch, '').trim();
      }
    }
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