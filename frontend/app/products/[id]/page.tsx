import { Product } from '@/types';
import AddToCartButton from '../../../components/AddToCartButton'; // A separate client component

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }

  const product: Product = await res.json();

  return (
    <div className="max-w-2xl mx-auto p-6 border rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-600 mb-2">{product.category}</p>
      <p className="text-lg text-green-600 font-semibold mb-4">${product.price}</p>
      <p>{product.description}</p>

      <AddToCartButton productId={product._id} />
    </div>
  );
}
