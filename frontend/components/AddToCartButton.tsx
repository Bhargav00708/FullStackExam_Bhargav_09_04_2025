'use client';

import { useState } from 'react';
import { isTokenExpired } from '@/app/utils/tokens';
import { useRouter } from 'next/navigation';

type Props = {
  productId: string;
};

const AddToCartButton = ({ productId }: Props) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const addToCart = async () => {
    const token = localStorage.getItem('token');

    if (!token || (token && isTokenExpired(token))) {
      alert('Please login to add items to your cart.');
      router.push('/login');
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.message || 'Failed to add to cart');
        return;
      }

      router.push('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="mt-4 space-y-2">
      <div className="flex items-center gap-2">
        <label htmlFor="quantity" className="font-medium">
          Quantity:
        </label>
        <input
          id="quantity"
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          className="w-20 p-2 border rounded"
        />
      </div>

      <button
        onClick={addToCart}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default AddToCartButton;
