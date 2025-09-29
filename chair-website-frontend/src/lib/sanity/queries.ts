// import groq from 'groq';

// export const featuredProductsQuery = groq`*[_type == "product" && isFeaturedProduct == true] {
//   _id, name, imagePath, price, description, discountPercentage, category
// }`;

// export const allProductsQuery = groq`*[_type == "product"] {
//   _id, name, imagePath, price, description, discountPercentage, category, stockLevel
// }`;

// export const productByIdQuery = groq`*[_type == "product" && _id == $id][0] {
//   _id, name, imagePath, price, description, discountPercentage, category, stockLevel
// }`;


// import groq from 'groq';

// export const featuredProductsQuery = groq`
//   *[_type == "product" && isFeaturedProduct == true && category == "Chair"] {
//     _id, name, imagePath, price, description, discountPercentage, category
//   }
// `;

// export const allProductsQuery = groq`
//   *[_type == "product" && category == "chair"] {
//     _id, name, imagePath, price, description, discountPercentage, category, stockLevel
//   } | order(name asc)
// `;

// export const productByIdQuery = groq`
//   *[_type == "product" && _id == $id][0] {
//     _id, name, imagePath, price, description, discountPercentage, category, stockLevel
//   }
// `;

// export const searchProductsQuery = groq`
//   *[_type == "product" && category == "chair" && (name match $query* || description match $query*)] {
//     _id, name, imagePath, price, description
//   } | order(_score desc) [0...10]
// `;




import groq from 'groq';

// Fetch featured products (chairs only)
export const featuredProductsQuery = groq`
  *[_type == "product" && isFeaturedProduct == true && category == "Chair"] {
    _id,
    _createdAt,
    _updatedAt,
    _rev,
    _originalId,
    name,
    imagePath,
    price,
    description,
    discountPercentage,
    category,
    stockLevel
  } | order(_createdAt desc)
`;

// Fetch all products (chairs only)
export const allProductsQuery = groq`
  *[_type == "product" && category == "Chair"] {
    _id,
    _createdAt,
    _updatedAt,
    _rev,
    _originalId,
    name,
    imagePath,
    price,
    description,
    discountPercentage,
    category,
    stockLevel
  } | order(name asc)
`;

// Fetch a single product by ID
export const productByIdQuery = groq`
  *[_type == "product" && _id == $id][0] {
    _id,
    _createdAt,
    _updatedAt,
    _rev,
    _originalId,
    name,
    imagePath,
    price,
    description,
    discountPercentage,
    category,
    stockLevel
  }
`;

// Search products (chairs only, by name or description)
export const searchProductsQuery = groq`
  *[_type == "product" && category == "Chair" && (name match $query || description match $query)] {
    _id,
    _createdAt,
    _updatedAt,
    _rev,
    _originalId,
    name,
    imagePath,
    price,
    description,
    discountPercentage,
    category,
    stockLevel
  } | order(_score desc) [0...10]
`;