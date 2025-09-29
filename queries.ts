// queries.ts
// GROQ queries for fetching product data from Sanity

// Fetch all products
export const allProductsQuery = `
  *[_type == "product"] {
    _id,
    _createdAt,
    _updatedAt,
    _rev,
    _originalId,
    name,
    description,
    category,
    price,
    discountPercentage,
    imagePath,
    isFeaturedProduct,
    stockLevel
  } | order(_createdAt desc)
`;

// Fetch products by category
export const productsByCategoryQuery = `
  *[_type == "product" && category == $category] {
    _id,
    _createdAt,
    _updatedAt,
    _rev,
    _originalId,
    name,
    description,
    category,
    price,
    discountPercentage,
    imagePath,
    isFeaturedProduct,
    stockLevel
  } | order(_createdAt desc)
`;

// Fetch featured products
export const featuredProductsQuery = `
  *[_type == "product" && isFeaturedProduct == true] {
    _id,
    _createdAt,
    _updatedAt,
    _rev,
    _originalId,
    name,
    description,
    category,
    price,
    discountPercentage,
    imagePath,
    isFeaturedProduct,
    stockLevel
  } | order(_createdAt desc)
`;

// Fetch a single product by ID
export const productByIdQuery = `
  *[_type == "product" && _id == $id][0] {
    _id,
    _createdAt,
    _updatedAt,
    _rev,
    _originalId,
    name,
    description,
    category,
    price,
    discountPercentage,
    imagePath,
    isFeaturedProduct,
    stockLevel
  }
`;