'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import { isTokenExpired } from '../utils/tokens';

export default function CheckoutPage() {
  const [cart, setCart] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  if (!token || token && isTokenExpired(token)) {
    router.push('/login');
    return;
  }

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
      } catch (err) {
        console.error('Error fetching cart:', err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchCart();
    else {
      alert('Please login to proceed to checkout.');
      router.push('/login');
    }
  }, [token, router]);

  const total = cart.reduce((sum, item) => sum + item.productId.price, 0);

  const handleCheckout = async () => {
    try {
      const payload = {
        items: cart.map((item) => ({
          product_id: item.productId._id,
          quantity: 1,
          price: item.productId.price,
        })),
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert('Order placed successfully!');
        router.push('/orders');
      } else {
        alert('Failed to place order.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong!');
    }
  };

  if (loading) return <p className="p-6">Loading cart...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
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
            </div>
          ))}
          <div className="text-right mt-4">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            <button
              onClick={handleCheckout}
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
