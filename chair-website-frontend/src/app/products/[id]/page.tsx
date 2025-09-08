import { sanityClient } from '@/lib/sanity/client';
import { productByIdQuery } from '@/lib/sanity/queries';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

interface Props {
  params: { id: string };
}

export default async function ProductDetail({ params }: Props) {
  const product = await sanityClient.fetch(productByIdQuery, { id: params.id });

  if (!product) {
    return <div>Chair not found.</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Image
        src={product.imagePath}
        alt={product.name}
        width={500}
        height={500}
        className="object-cover rounded-lg"
      />
      <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
      <p className="text-2xl text-green-600 mt-2">
        ${product.price} {product.discountPercentage ? `(${product.discountPercentage}% off)` : ''}
      </p>
      <p className="mt-4">{product.description}</p>
      <p className="mt-2">Stock: {product.stockLevel}</p>
      <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">Add to Cart</button>
    </div>
  );
}