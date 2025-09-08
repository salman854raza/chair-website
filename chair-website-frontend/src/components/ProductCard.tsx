'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { SanityProduct } from '@/types/product';

interface Props {
  product: SanityProduct;
}

export default function ProductCard({ product }: Props) {
  const { dispatch } = useCart();

  const addToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: { ...product, quantity: 1 } });
  };

  const discountedPrice = product.price * (1 - (product.discountPercentage || 0) / 100);

  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
      <Image
        src={product.imagePath}
        alt={product.name}
        width={300}
        height={300}
        className="w-full h-64 object-cover rounded"
      />
      <h2 className="text-xl font-bold mt-2">{product.name}</h2>
      <p className="text-gray-600">{product.description.substring(0, 100)}...</p>
      <div className="mt-2">
        {product.discountPercentage ? (
          <>
            <span className="text-lg font-bold">${discountedPrice}</span>
            <span className="text-sm text-gray-500 line-through ml-2">${product.price}</span>
          </>
        ) : (
          <span className="text-lg font-bold">${product.price}</span>
        )}
      </div>
      <div className="mt-2 space-x-2">
        <Link href={`/products/${product._id}`} className="text-blue-500">View</Link>
        <button onClick={addToCart} className="bg-green-500 text-white px-3 py-1 rounded">Add to Cart</button>
      </div>
    </div>
  );
}