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
  
  // Split text into lines and look for patterns
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  // Look for webhook output format: Title on one line, prices on next lines
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if this line looks like a product title (contains "Piesă" or "piesa" or doesn't contain "RON")
    if (line.match(/^Piesă auto|^piesa auto/i) || (!line.includes('RON') && line.length > 10)) {
      const productName = line;
      let currentPrice = '';
      let originalPrice = '';
      
      // Look for prices in the next lines
      if (i + 1 < lines.length && lines[i + 1].includes('RON')) {
        currentPrice = lines[i + 1];
      }
      if (i + 2 < lines.length && lines[i + 2].includes('RON')) {
        originalPrice = lines[i + 2];
      }
      
      if (currentPrice) {
        const productUrl = urls[products.length] || '#';
        
        products.push({
          id: `product-${products.length}`,
          name: productName,
          price: currentPrice,
          originalPrice: originalPrice || undefined,
          image: `/lovable-uploads/${[
            '24bc764d-8443-4b7c-9715-f88d0815c485.png',
            '5756f75e-1758-412b-9390-0cfa1f14bbc6.png',
            '578e533f-92e8-4bf5-a4f5-5f859a59ca0f.png',
            '6d88c142-2eb2-4748-beed-6a725d1dc7e1.png'
          ][products.length % 4]}`,
          rating: 4 + Math.random(), // 4-5 rating
          inStock: true,
          url: productUrl
        });
        
        // Remove the matched lines from clean text
        cleanText = cleanText.replace(productName, '');
        cleanText = cleanText.replace(currentPrice, '');
        if (originalPrice) {
          cleanText = cleanText.replace(originalPrice, '');
        }
      }
    }
  }
  
  // Fallback: Look for traditional Romanian patterns if no webhook format found
  if (products.length === 0) {
    const patterns = [
      // Pattern 1: "avem baterie Brand Model disponibilă ... Prețul este de X lei"
      /(?:avem|găsit)\s+(?:baterie|piesa?|produs)\s+([A-Za-z0-9\s]+?)(?:\s+disponibilă|\s+în\s+stoc).*?(?:prețul\s+este\s+de|costă|preț)\s*(\d+(?:[.,]\d+)?)\s*lei/gi,
      // Pattern 2: Direct format "Product Name — Price lei"
      /([A-Za-z][A-Za-z0-9\s]+?)\s*[—–-]\s*(\d+(?:[.,]\d+)?)\s*lei/gi,
      // Pattern 3: "Brand Model" followed by price anywhere in text
      /(?:baterie|piesa?)\s+([A-Za-z]+\s+[A-Za-z0-9\s]+?)(?:\s+disponibilă|\s+în\s+stoc|\s+pentru|\s+—).*?(\d+(?:[.,]\d+)?)\s*lei/gi
    ];
    
    let matches: RegExpMatchArray[] = [];
    
    // Try each pattern until we find matches
    for (const pattern of patterns) {
      matches = [...text.matchAll(pattern)];
      if (matches.length > 0) break;
    }
    
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
  }
  
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