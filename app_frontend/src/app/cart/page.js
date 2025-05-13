'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }
        const response = await fetch('http://localhost:3344/api/cart/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch cart');
        }
        const data = await response.json();
        console.log('Cart API Response:', data);
        console.log('Cart Items:', data.items);
        if (data.items && data.items.length > 0) {
          console.log('First Item Product:', data.items[0].product);
        }
        setCart(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [router]);

  const handleRemoveItem = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3344/api/cart/item/${itemId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 204) {
        setCart((prev) => ({ ...prev, items: prev.items.filter(item => item.id !== itemId) }));
      }
    } catch (err) {
      alert('Failed to remove item from cart.');
    }
  };

  const getTotal = () => {
    if (!cart) return 0;
    return cart.items.reduce((total, item) => total + item.product.price, 0);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600 mt-12">{error}</div>;
  if (!cart || cart.items.length === 0) {
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
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm p-6 mb-4 flex flex-col sm:flex-row items-center gap-4"
              >
                <img
                  src={item.product.image_url || "/placeholder-product.jpg"}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-reu-brown">{item.product.name}</h3>
                  <p className="text-reu-brown/80">{item.product.price} THB</p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleRemoveItem(item.id)}
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
                  <span>Items ({cart.items.length})</span>
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