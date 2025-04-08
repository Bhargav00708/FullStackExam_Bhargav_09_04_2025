'use client';

import Link from 'next/link';
import { Product } from '@/types';

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return (
    <div className="border p-4 rounded shadow">
      <h3 className="font-bold text-lg">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.category}</p>
      <p className="text-green-600 font-semibold">${product.price}</p>
      <Link href={`/product/${product._id}`} className="text-blue-500 underline">
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
