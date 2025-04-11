'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isTokenExpired } from '@/app/utils/tokens';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token && !isTokenExpired(token)) {
      router.push('/products');
    } else {
      localStorage.removeItem('token');
      router.push('/login');
    }
  }, [router]);

  return null;
}