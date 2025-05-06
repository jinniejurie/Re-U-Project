'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    getTotalPrice,
  } = useCart();

  return (
    <div className="min-h-screen bg-reu-cream">
      <div className="container mx-auto px-4 pt-32 pb-16">
        <h1 className="text-4xl font-bold text-reu-brown text-center mb-12">Your Cart</h1>
        
        {cart.length === 0 ? (
          <div className="text-center">
            <p className="text-xl text-reu-brown mb-4">Your cart is empty</p>
            <Link
              href="/products"
              className="inline-block bg-reu-red text-white px-6 py-3 rounded-lg hover:bg-reu-red/90 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm p-6 mb-4 flex flex-col sm:flex-row items-center gap-4"
                >
                  <img
                    src={item.image || "/placeholder-product.jpg"}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-reu-brown">{item.title}</h3>
                    <p className="text-reu-brown/80">{item.price}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-3 py-1">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
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
                    <span>Items ({getTotalItems()})</span>
                    <span>{getTotalPrice().toFixed(2)} THB</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{getTotalPrice().toFixed(2)} THB</span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="block w-full bg-reu-red text-white py-3 rounded-lg hover:bg-reu-red/90 transition-colors text-center"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 