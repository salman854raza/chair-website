import dotenv from 'dotenv';
import axios from 'axios';
import { createClient } from '@sanity/client';

dotenv.config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: process.env.SANITY_API_VERSION,
  useCdn: false, // Set to false for write operations
});

async function importData() {
  try {
    const apiUrl = 'https://next-ecommerce-template-4.vercel.app/api/product';
    const response = await axios.get(apiUrl);
    const products = response.data.products; // Assuming the API returns { products: [...] }

    for (const product of products) {
      const doc = {
        _id: product.id, // Use the provided id as Sanity document _id
        _type: 'product',
        name: product.name,
        imagePath: product.imagePath,
        price: parseFloat(product.price), // Convert string to number
        description: product.description,
        discountPercentage: product.discountPercentage,
        isFeaturedProduct: product.isFeaturedProduct,
        stockLevel: product.stockLevel,
        category: product.category,
      };

      // Create the document if it doesn't exist, or replace if it does
      await client.createOrReplace(doc);
      console.log(`Imported/Updated product: ${product.name}`);
    }

    console.log('Data import completed successfully!');
  } catch (error) {
    console.error('Error importing data:', error);
  }
}

importData();