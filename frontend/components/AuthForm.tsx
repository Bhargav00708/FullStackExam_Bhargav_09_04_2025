'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import api, { setAuthToken } from '@/lib/api';
import { AxiosError } from 'axios';

type Props = {
  type: 'login' | 'register';
};

const AuthForm = ({ type }: Props) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await api.post(`/auth/${type}`, {
        email,
        password,
        ...(type === 'register' && { name }),
      });

      const token = res.data.token;
      setAuthToken(token);
      localStorage.setItem('token', token);

      router.push(type === 'register' ? '/login' : '/products');
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold capitalize text-center">{type}</h2>

      {type === 'register' && (
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {type === 'login' ? 'Login' : 'Register'}
      </button>

      {type === 'login' ? (
        <p className="text-sm text-center">
          Don&apos;t have an account?{' '}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => router.push('/register')}
          >
            Register
          </span>
        </p>
      ) : (
        <p className="text-sm text-center">
          Already have an account?{' '}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => router.push('/login')}
          >
            Login
          </span>
        </p>
      )}
    </form>
  );
};

export default AuthForm;
