'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Checkout() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    city: '',
    postcode: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!/^\+?1?\d{9,15}$/.test(formData.phoneNumber)) {
      setError('Please enter a valid phone number');
      return false;
    }
    if (!/^\d{5}$/.test(formData.postcode)) {
      setError('Please enter a valid 5-digit postcode');
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
      // Here you would typically send the order to your backend
      // For now, we'll just redirect to a success page
      router.push('/order-success');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-reu-cream text-reu-brown flex items-center justify-center">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-12">
        <h1 className="text-3xl font-bold text-center mb-2">Checkout</h1>
        <p className="text-center text-gray-500 mb-8">Enter your shipping information</p>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-center" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md bg-gray-100 border-0 focus:ring-2 focus:ring-reu-red sm:text-sm px-4 py-3 placeholder-gray-400"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md bg-gray-100 border-0 focus:ring-2 focus:ring-reu-red sm:text-sm px-4 py-3 placeholder-gray-400"
              />
            </div>
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              required
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-100 border-0 focus:ring-2 focus:ring-reu-red sm:text-sm px-4 py-3 placeholder-gray-400"
              placeholder="+66XXXXXXXXX"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
            <textarea
              name="address"
              id="address"
              required
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md bg-gray-100 border-0 focus:ring-2 focus:ring-reu-red sm:text-sm px-4 py-3 placeholder-gray-400"
            />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                name="city"
                id="city"
                required
                value={formData.city}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md bg-gray-100 border-0 focus:ring-2 focus:ring-reu-red sm:text-sm px-4 py-3 placeholder-gray-400"
              />
            </div>
            <div>
              <label htmlFor="postcode" className="block text-sm font-medium mb-1">Postcode</label>
              <input
                type="text"
                name="postcode"
                id="postcode"
                required
                value={formData.postcode}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md bg-gray-100 border-0 focus:ring-2 focus:ring-reu-red sm:text-sm px-4 py-3 placeholder-gray-400"
                placeholder="5 digits"
              />
            </div>
          </div>
          <div className="flex justify-between pt-6">
            <Link
              href="/cart"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-reu-red"
            >
              Back to Cart
            </Link>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-reu-red hover:bg-reu-brown focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-reu-red"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 