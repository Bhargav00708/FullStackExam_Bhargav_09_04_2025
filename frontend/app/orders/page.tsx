'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isTokenExpired } from '../utils/tokens';

type OrderItem = {
  productId: string;
  quantity: number;
  price: number;
};

type Order = {
  id: number;
  createdAt: string;
  total: number;
  items: OrderItem[];
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
  
      if (!token || token && isTokenExpired(token)) {
        router.push('/login');
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      
      setOrders(data);
    };

    fetchOrders();
  }, [router]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="border p-4 rounded mb-4">
            <p className="font-bold mb-1">Order #{order.id}</p>
            <p className="text-sm text-gray-500 mb-2">
              Placed on: {new Date(order.createdAt).toLocaleString()}
            </p>
            <ul className="pl-4 list-disc mb-2">
              {order.items.map((item, idx) => (
                <li key={idx}>
                  Product ID: {item.productId} - Qty: {item.quantity}
                </li>
              ))}
            </ul>
            <p className="font-semibold">Total: ${order.total}</p>
          </div>
        ))
      )}
    </div>
  );
}
