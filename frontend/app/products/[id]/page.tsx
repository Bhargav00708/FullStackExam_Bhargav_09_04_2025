'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';

type Params = {
  params: { id: string };
};

export default function ProductDetailPage({ params }: Params) {
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`);
      const data = await res.json();
      setProduct(data);
    };
    fetchProduct();
  }, [params.id]);

  const addToCart = () => {
    const stored = localStorage.getItem('cart');
    const cart = stored ? JSON.parse(stored) : [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    router.push('/cart');
  };

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 border rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-600 mb-2">{product.category}</p>
      <p className="text-lg text-green-600 font-semibold mb-4">${product.price}</p>
      <p>{product.description}</p>
      <button
        onClick={addToCart}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
}
