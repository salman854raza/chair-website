import {createClient} from '@sanity/client'
import fetch from 'node-fetch'

// Sanity client configuration
const client = createClient({
  projectId: 'uazz9k5g',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN, // You'll need to set this
  apiVersion: '2024-01-01',
})

// Sample API endpoints - replace with your actual API URLs
const API_ENDPOINTS = {
  products: 'https://fakestoreapi.com/products',
  categories: 'https://fakestoreapi.com/products/categories',
}

// Helper function to create slug from string
function createSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

// Helper function to upload image to Sanity
async function uploadImageToSanity(imageUrl, filename) {
  try {
    const response = await fetch(imageUrl)
    const buffer = await response.buffer()
    
    const asset = await client.assets.upload('image', buffer, {
      filename: filename,
    })
    
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
      alt: filename,
    }
  } catch (error) {
    console.error('Error uploading image:', error)
    return null
  }
}

// Import categories
async function importCategories() {
  try {
    console.log('Importing categories...')
    const response = await fetch(API_ENDPOINTS.categories)
    const categories = await response.json()
    
    const sanityCategories = []
    
    for (const category of categories) {
      const sanityCategory = {
        _type: 'category',
        name: category.charAt(0).toUpperCase() + category.slice(1),
        slug: {
          _type: 'slug',
          current: createSlug(category),
        },
        description: `${category.charAt(0).toUpperCase() + category.slice(1)} collection`,
        featured: Math.random() > 0.7, // Randomly feature some categories
        sortOrder: Math.floor(Math.random() * 100),
      }
      
      sanityCategories.push(sanityCategory)
    }
    
    // Create categories in Sanity
    for (const category of sanityCategories) {
      const result = await client.create(category)
      console.log(`Created category: ${result.name}`)
    }
    
    return sanityCategories
  } catch (error) {
    console.error('Error importing categories:', error)
  }
}

// Import products
async function importProducts() {
  try {
    console.log('Importing products...')
    const response = await fetch(API_ENDPOINTS.products)
    const products = await response.json()
    
    // Get existing categories to reference
    const categories = await client.fetch('*[_type == "category"]')
    
    for (const product of products) {
      // Find matching category
      const matchingCategory = categories.find(cat => 
        cat.name.toLowerCase().includes(product.category.toLowerCase()) ||
        product.category.toLowerCase().includes(cat.name.toLowerCase())
      )
      
      // Upload product image
      const productImage = await uploadImageToSanity(
        product.image, 
        `${createSlug(product.title)}.jpg`
      )
      
      // Generate random sizes and colors for clothing
      const sizes = [
        { size: 's', stock: Math.floor(Math.random() * 50) + 1 },
        { size: 'm', stock: Math.floor(Math.random() * 50) + 1 },
        { size: 'l', stock: Math.floor(Math.random() * 50) + 1 },
        { size: 'xl', stock: Math.floor(Math.random() * 50) + 1 },
      ]
      
      const colors = [
        { name: 'Black', hex: '#000000' },
        { name: 'White', hex: '#FFFFFF' },
        { name: 'Navy', hex: '#000080' },
        { name: 'Gray', hex: '#808080' },
      ]
      
      const sanityProduct = {
        _type: 'product',
        name: product.title,
        slug: {
          _type: 'slug',
          current: createSlug(product.title),
        },
        description: product.description,
        price: Math.round(product.price * 100) / 100, // Round to 2 decimal places
        compareAtPrice: Math.round(product.price * 1.2 * 100) / 100, // 20% higher for sale effect
        images: productImage ? [productImage] : [],
        category: matchingCategory ? {
          _type: 'reference',
          _ref: matchingCategory._id,
        } : undefined,
        sizes: sizes,
        colors: colors.slice(0, Math.floor(Math.random() * 3) + 1), // Random 1-3 colors
        tags: [product.category, 'imported'],
        featured: product.rating?.rate > 4, // Feature highly rated products
        onSale: Math.random() > 0.7, // 30% chance of being on sale
        status: 'active',
        seo: {
          title: product.title,
          description: product.description.substring(0, 160),
        },
      }
      
      const result = await client.create(sanityProduct)
      console.log(`Created product: ${result.name}`)
    }
  } catch (error) {
    console.error('Error importing products:', error)
  }
}

// Create sample brands
async function createSampleBrands() {
  console.log('Creating sample brands...')
  
  const brands = [
    { name: 'StyleCo', description: 'Modern fashion for the contemporary lifestyle' },
    { name: 'UrbanWear', description: 'Street style and urban fashion' },
    { name: 'ClassicThreads', description: 'Timeless elegance and classic designs' },
    { name: 'TrendSetters', description: 'Latest fashion trends and styles' },
  ]
  
  for (const brand of brands) {
    const sanityBrand = {
      _type: 'brand',
      name: brand.name,
      slug: {
        _type: 'slug',
        current: createSlug(brand.name),
      },
      description: brand.description,
      featured: Math.random() > 0.5,
    }
    
    const result = await client.create(sanityBrand)
    console.log(`Created brand: ${result.name}`)
  }
}

// Main import function
async function importData() {
  try {
    console.log('Starting data import...')
    
    // Check if we have the required token
    if (!process.env.SANITY_AUTH_TOKEN) {
      console.error('Please set SANITY_AUTH_TOKEN environment variable')
      console.log('Get your token from: https://sanity.io/manage')
      return
    }
    
    // Import in order (categories first, then products that reference them)
    await createSampleBrands()
    await importCategories()
    await importProducts()
    
    console.log('Data import completed successfully!')
  } catch (error) {
    console.error('Import failed:', error)
  }
}

// Run the import
importData()