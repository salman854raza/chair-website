export interface SanityProduct {
  _id: string;
  _type: 'product';
  name: string;
  imagePath: string;
  price: number;
  description: string;
  discountPercentage?: number;
  isFeaturedProduct?: boolean;
  stockLevel?: number;
  category: string;
}

export interface CartItem extends SanityProduct {
  quantity: number;
}