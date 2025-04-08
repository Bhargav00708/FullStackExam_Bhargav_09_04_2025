'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';

export default function CheckoutPage() {
  const [cart, setCart] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) setCart(JSON.parse(stored));
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first');
      router.push('/login');
      return;
    }

    const payload = {
      items: cart.map((item) => ({
        product_id: item._id,
        quantity: 1, // You can improve this later
        price: item.price,
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
      localStorage.removeItem('cart');
      router.push('/orders');
    } else {
      alert('Something went wrong!');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item._id} className="flex justify-between items-center border p-4 rounded">
              <div>
                <h2 className="font-bold">{item.name}</h2>
                <p>${item.price}</p>
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
