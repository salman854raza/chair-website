import groq from 'groq';

export const featuredProductsQuery = groq`
  *[_type == "product" && isFeaturedProduct == true && category == "chair"] {
    _id, name, imagePath, price, description, discountPercentage, category
  }
`;

export const allProductsQuery = groq`
  *[_type == "product" && category == "chair"] {
    _id, name, imagePath, price, description, discountPercentage, category, stockLevel
  } | order(name asc)
`;

export const productByIdQuery = groq`
  *[_type == "product" && _id == $id][0] {
    _id, name, imagePath, price, description, discountPercentage, category, stockLevel
  }
`;

export const searchProductsQuery = groq`
  *[_type == "product" && category == "chair" && (name match $query* || description match $query*)] {
    _id, name, imagePath, price, description
  } | order(_score desc) [0...10]
`;