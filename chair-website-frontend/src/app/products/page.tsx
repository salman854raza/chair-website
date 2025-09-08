import { sanityClient } from '@/lib/sanity/client';
import { allProductsQuery } from '@/lib/sanity/queries';
import ProductCard from '@/components/ProductCard';

export default async function Products() {
  const products = await sanityClient.fetch(allProductsQuery);

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-6">All Chairs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </main>
  );
}