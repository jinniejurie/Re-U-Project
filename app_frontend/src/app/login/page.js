'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="min-h-screen bg-reu-cream text-reu-brown flex items-center justify-center">
      <div className="w-full px-4">
        <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-medium mb-4">Login to Account</h1>
            <p className="text-gray-600">Please enter your email and password to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-reu-red"
                placeholder="example@dome.tu.ac.th"
              />
            </div>

            <div className="relative">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block">
                  Password
                </label>
                <Link href="/forgot-password" className="text-reu-red hover:text-reu-red/80 text-sm">
                  Forget Password?
                </Link>
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

            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                checked={rememberPassword}
                onChange={(e) => setRememberPassword(e.target.checked)}
                className="h-4 w-4 text-reu-red focus:ring-reu-red border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-gray-700">
                Remember Password
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF6B6B] text-white py-3 rounded-lg hover:bg-[#FF6B6B]/90 transition-colors font-medium"
            >
              Sign In
            </button>

            <div className="text-center text-gray-600">
              Don't have an account?{' '}
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
