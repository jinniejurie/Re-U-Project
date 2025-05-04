'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
  };
  return (
    <div className="min-h-screen bg-reu-cream flex items-center justify-center">
      <div className="w-full px-4">
        <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-medium text-gray-900 mb-4">Create an Account</h1>
            <p className="text-gray-600">Create a account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email address:
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-reu-red"
                placeholder="example@gmail.com"
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-gray-700 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-reu-red"
                placeholder="Username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password
              </label>
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
                id="terms"
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="h-4 w-4 text-reu-red focus:ring-reu-red border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-gray-700">
                I accept terms and conditions
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF6B6B] text-white py-3 rounded-lg hover:bg-[#FF6B6B]/90 transition-colors font-medium"
            >
              Sign Up
            </button>

            <div className="text-center text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-reu-red hover:text-reu-red/80">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
