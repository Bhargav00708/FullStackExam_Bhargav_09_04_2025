'use client';

import { useEffect, useState } from 'react';
import { isTokenExpired } from '../utils/tokens';
import { AxiosError } from 'axios';

type Spender = {
  userid: number;
  email: string;
  totalspent: number;
};

const TopSpendersPage = () => {
  const [spenders, setSpenders] = useState<Spender[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTopSpenders = async () => {
      const token = localStorage.getItem('token');

      if (!token || token && isTokenExpired(token)) {
        setError('Unauthorized. Please login.');
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reports/sql/top-spenders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch report');

        const data = await res.json();
        setSpenders(data);
      } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        setError(error.response?.data?.message || 'Could not load top spenders');
      }
    };

    fetchTopSpenders();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Top 3 Spenders Report</h1>
      {error && <p className="text-red-500">{error}</p>}

      {spenders.length > 0 ? (
        <ul className="space-y-2">
          {spenders.map((spender, index) => (
            <li key={index} className="p-4 border rounded shadow">
              <p className="font-semibold">
                {index + 1}. {spender.email}
              </p>
              <p>Total Spent: ${spender.totalspent}</p>
            </li>
          ))}
        </ul>
      ) : !error ? (
        <p>Loading report...</p>
      ) : null}
    </div>
  );
};

export default TopSpendersPage;
