'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:3345/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          password2: formData.confirmPassword
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error('Registration error:', data);        
        const messages = [];
      
        if (data.detail) {
          messages.push(data.detail);
        }
      
        for (const key in data) {
          if (Array.isArray(data[key])) {
            messages.push(`${key}: ${data[key].join(', ')}`);
          }
        }
      
        throw new Error(messages.join(' | ') || 'Registration failed');
      }      

      // Auto-login after successful registration
      const loginResponse = await fetch('http://localhost:3345/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });
      const loginData = await loginResponse.json();
      if (!loginResponse.ok) {
        throw new Error(loginData.detail || loginData.message || 'Auto-login failed');
      }
      localStorage.setItem('token', loginData.token);
      router.push('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-reu-cream text-reu-brown flex items-center justify-center">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-12">
        <h1 className="text-3xl font-bold text-center mb-2">Create an Account</h1>
        <p className="text-center text-gray-500 mb-8">Create a account to continue</p>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-center" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email address</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-100 border-0 focus:ring-2 focus:ring-reu-red sm:text-sm px-4 py-3 placeholder-gray-400"
              placeholder="example@dome.tu.ac.th"
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              required
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-100 border-0 focus:ring-2 focus:ring-reu-red sm:text-sm px-4 py-3 placeholder-gray-400"
              placeholder="Username"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-100 border-0 focus:ring-2 focus:ring-reu-red sm:text-sm px-4 py-3 placeholder-gray-400"
              placeholder="Password"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-100 border-0 focus:ring-2 focus:ring-reu-red sm:text-sm px-4 py-3 placeholder-gray-400"
              placeholder="Confirm Password"
            />
          </div>
          <div className="flex items-center">
            <input
              id="acceptTerms"
              name="acceptTerms"
              type="checkbox"
              checked={acceptTerms}
              onChange={e => setAcceptTerms(e.target.checked)}
              className="h-4 w-4 text-reu-red focus:ring-reu-red border-gray-300 rounded"
              required
            />
            <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-700">
              I accept terms and conditions
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[#fa6a5b] text-white font-semibold text-base hover:bg-[#e65c4d] transition-colors"
          >
            Sign Up
          </button>
          <p className="text-center text-gray-500 text-sm mt-4">
            Already have an account?{' '}
            <Link href="/login" className="text-reu-red hover:text-reu-brown font-medium">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
