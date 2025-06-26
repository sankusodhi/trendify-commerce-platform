
import { toast } from "sonner";

// Set your API key here (for testing purposes only)
// In a production app, this should come from environment variables or user input
const API_KEY = ""; // User will need to provide this

export interface GenerateImageParams {
  positivePrompt: string;
  model?: string;
  numberResults?: number;
  outputFormat?: string;
  CFGScale?: number;
  scheduler?: string;
  strength?: number;
  promptWeighting?: "compel" | "sdEmbeds" | "none";
  seed?: number | null;
  lora?: string[];
}

export interface GeneratedImage {
  imageURL: string;
  positivePrompt: string;
  seed: number;
  NSFWContent: boolean;
}

export const generateProductImage = async (productName: string, price?: number): Promise<string> => {
  try {
    // For development/testing, return placeholder images if no API key
    const apiKey = localStorage.getItem("runware_api_key") || API_KEY;
    
    if (!apiKey) {
      console.warn("No Runware API key provided, using placeholder images");
      return `https://via.placeholder.com/300x300/${getRandomColor()}/FFFFFF?text=${encodeURIComponent(productName.substring(0, 10))}`;
    }

    // Create a price-specific prompt addition
    let priceQualifier = "";
    if (price) {
      if (price > 10000) {
        priceQualifier = "premium luxury";
      } else if (price > 5000) {
        priceQualifier = "high-end";
      } else if (price > 2000) {
        priceQualifier = "mid-range";
      } else {
        priceQualifier = "budget-friendly";
      }
    }

    const response = await fetch('https://api.runware.ai/v1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        {
          taskType: "authentication",
          apiKey: apiKey
        },
        {
          taskType: "imageInference",
          taskUUID: crypto.randomUUID(),
          positivePrompt: `High quality product photograph of ${priceQualifier} ${productName}, white background, professional lighting, e-commerce style`,
          width: 512,
          height: 512,
          model: "runware:100@1",
          numberResults: 1
        }
      ])
    });

    if (!response.ok) {
      throw new Error(`Failed to generate image: ${response.statusText}`);
    }

    const result = await response.json();
    
    if (result.error || result.errors) {
      const errorMessage = result.errorMessage || result.errors?.[0]?.message || "An error occurred";
      throw new Error(errorMessage);
    }

    if (result.data && result.data[1]?.imageURL) {
      return result.data[1].imageURL;
    } else {
      throw new Error("No image URL returned from API");
    }
  } catch (error) {
    console.error("Error generating product image:", error);
    toast.error("Failed to generate product image");
    // Fallback to a placeholder image
    return `https://via.placeholder.com/300x300/${getRandomColor()}/FFFFFF?text=${encodeURIComponent(productName.substring(0, 10))}`;
  }
};

// Helper function to generate consistent but random colors for placeholder images
const getRandomColor = (): string => {
  const colors = ["3B82F6", "EC4899", "8B5CF6", "10B981", "F59E0B", "EF4444", "6366F1", "A855F7", "059669", "3730A3", "DB2777", "065F46"];
  const hash = productNameToHash("placeholder");
  return colors[hash % colors.length];
};

const productNameToHash = (name: string): number => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = ((hash << 5) - hash) + name.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

// Function to generate image based on product data
export const getProductImage = async (product: {
  name: string;
  category: string;
  id: number | string;
  price?: number;
}): Promise<string> => {
  // Check local storage first
  const storageKey = `product_image_${product.id}`;
  const cachedImage = localStorage.getItem(storageKey);
  
  if (cachedImage) {
    return cachedImage;
  }
  
  // Generate new image
  const prompt = `High quality product photograph of ${product.name}, ${product.category} item, white background, professional lighting, e-commerce style`;
  const imageUrl = await generateProductImage(prompt, product.price);
  
  // Cache the image URL
  localStorage.setItem(storageKey, imageUrl);
  
  return imageUrl;
};
