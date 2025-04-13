'use client';

import { isTokenExpired } from '@/app/utils/tokens';
import { useRouter } from 'next/navigation';

type Props = {
  productId: string;
};

const AddToCartButton = ({ productId }: Props) => {
  const router = useRouter();

  const addToCart = async () => {
    const token = localStorage.getItem('token');
    
    if (!token || token && isTokenExpired(token)) {
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
          quantity: 1,
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
    <button
      onClick={addToCart}
      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
