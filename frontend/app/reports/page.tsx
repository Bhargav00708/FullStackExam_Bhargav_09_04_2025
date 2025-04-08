'use client';

import { useEffect, useState } from 'react';

type Revenue = {
  date: string;
  total: number;
};

type Spender = {
  user_id: number;
  total_spent: number;
};

type SalesByCategory = {
  category: string;
  total_sales: number;
};

export default function ReportsPage() {
  const [revenue, setRevenue] = useState<Revenue[]>([]);
  const [spenders, setSpenders] = useState<Spender[]>([]);
  const [sales, setSales] = useState<SalesByCategory[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reports`);
      const data = await res.json();
      setRevenue(data.sql.dailyRevenue || []);
      setSpenders(data.sql.topSpenders || []);
      setSales(data.mongo.salesByCategory || []);
    };
    fetchReports();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Reports</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">🗓️ Daily Revenue</h2>
        <ul className="space-y-1">
          {revenue.map((r, i) => (
            <li key={i} className="flex justify-between">
              <span>{r.date}</span>
              <span>${r.total.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mt-4 mb-2">💸 Top Spenders</h2>
        <ul className="space-y-1">
          {spenders.map((s, i) => (
            <li key={i} className="flex justify-between">
              <span>User #{s.user_id}</span>
              <span>${s.total_spent.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mt-4 mb-2">📦 Sales by Category</h2>
        <ul className="space-y-1">
          {sales.map((s, i) => (
            <li key={i} className="flex justify-between">
              <span>{s.category}</span>
              <span>${s.total_sales.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
