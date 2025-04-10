'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/types';
import Link from 'next/link';

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setCart(data.items);
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchCart();
  }, [token]);

  const removeFromCart = async (productId: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (!res.ok) throw new Error('Failed to remove item');

      setCart((prev) => prev.filter((item) => item.productId._id !== productId));
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  const total = (cart ?? []).reduce((sum, p) => sum + p.productId.price, 0);

  if (loading) return <p className="p-6">Loading cart...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      <Link
        href="/products"
        className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-6"
      >
        Continue Shopping
      </Link>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.productId._id} className="flex justify-between items-center border p-4 rounded">
              <div>
                <h2 className="font-bold">{item.productId.name}</h2>
                <p>${item.productId.price}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.productId._id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="text-right mt-4">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            <Link
              href="/checkout"
              className="inline-block mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
