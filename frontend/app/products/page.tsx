import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    cache: 'no-store',
  });
  
  return res.json();
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="p-6">
      <div className="mb-6">
        <Link href="/reports" className="text-blue-600 hover:underline text-lg">
          📊 View Reports
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </main>
  );
}
