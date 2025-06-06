"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/api/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || data.message || 'Login failed');
      }
      // Store token (for demo, use localStorage)
      localStorage.setItem('token', data.access);
      window.dispatchEvent(new Event('authChange'));
      router.push('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-reu-cream text-reu-brown flex items-center justify-center">
      <div className="w-full px-4">
        <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-medium mb-4">Login to Account</h1>
            <p className="text-gray-600">Please enter your username and password to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-reu-red"
                placeholder="Enter your username"
              />
            </div>

            <div className="relative">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block">
                  Password
                </label>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-reu-red"
                placeholder="••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF6B6B] text-white py-3 rounded-lg hover:bg-[#FF6B6B]/90 transition-colors font-medium"
            >
              Sign In
            </button>

            <div className="text-center text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-reu-red hover:text-reu-red/80">
                Create Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
