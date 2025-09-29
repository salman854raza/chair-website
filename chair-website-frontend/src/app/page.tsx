import { sanityClient } from '@/lib/sanity/client';
import { featuredProductsQuery } from '@/lib/sanity/queries';
import Image from 'next/image';

export default async function Home() {
  const products = await sanityClient.fetch(featuredProductsQuery);
  return (
    <main className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product: any) => (
        <div key={product._id} className="border p-4 rounded">
          <Image src={product.imagePath} alt={product.name} width={300} height={300} className="w-full" />
          <h2 className="text-xl">{product.name}</h2>
          <p>${product.price}</p>
        </div>
      ))}
    </main>
  );
}








// import { sanityClient } from '@/lib/sanity/client';
// import { featuredProductsQuery } from '@/lib/sanity/queries';
// // import Image from 'next/image';
// import ProductCard from '@/components/ProductCard';
// // import Image from 'next/image';

// export default async function Home() {
//   const products = await sanityClient.fetch(featuredProductsQuery);

//   return (
//     <main className="p-4">
//       <h1 className="text-3xl font-bold mb-6">Featured Chairs</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {products.map((product: any) => (
//           <ProductCard key={product._id} product={product} />
//         ))}
//       </div>
//     </main>
//   );
// }