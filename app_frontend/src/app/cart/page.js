'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
    setLoading(false);
  }, []);

  const handleRemoveItem = (itemId) => {
    const updatedCart = cart.filter(item => item.product_id !== itemId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    const updatedCart = cart.map(item => {
      if (item.product_id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0);

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.product_price, 0);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-reu-cream">
        <div className="container mx-auto px-4 pt-32 pb-16">
          <h1 className="text-4xl font-bold text-reu-brown text-center mb-12">Your Cart</h1>
          <div className="text-center">
            <p className="text-xl text-reu-brown mb-4">Your cart is empty</p>
            <Link
              href="/products"
              className="inline-block bg-reu-red text-white px-6 py-3 rounded-lg hover:bg-reu-red/90 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-reu-cream">
      <div className="container mx-auto px-4 pt-32 pb-16">
        <h1 className="text-4xl font-bold text-reu-brown text-center mb-12">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {cart.map((item) => (
              <div
                key={item.product_id}
                className="bg-white rounded-lg shadow-sm p-6 mb-4 flex flex-col sm:flex-row items-center gap-4"
              >
                <img
                  src={item.image || "/placeholder-product.jpg"}
                  alt={item.product_name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-reu-brown">{item.product_name}</h3>
                  <p className="text-reu-brown/80">{item.product_price} THB</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded">
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.product_id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-reu-brown mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Items ({cart.length})</span>
                  <span>{getTotal()} THB</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{getTotal()} THB</span>
                </div>
              </div>
              <button
                onClick={() => {
                  const token = localStorage.getItem('token');
                  if (!token) {
                    router.push('/login');
                  } else {
                    router.push('/checkout');
                  }
                }}
                className="block w-full bg-reu-red text-white py-3 rounded-lg hover:bg-reu-red/90 transition-colors text-center"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 