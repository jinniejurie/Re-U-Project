'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Checkout() {
  const router = useRouter();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    deliveryType: 'pickup',
    meetingLocation: '',
    preferredDate: '',
    preferredTime: '',
    notes: '',
  });
  const [showModal, setShowModal] = useState(false);

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
        setCart(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [router]);

  const subtotal = cart ? cart.items.reduce((total, item) => total + item.product.price, 0) : 0;
  const shipping = 0;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cart) return;
    const payload = {
      email: form.email,
      first_name: form.firstName,
      last_name: form.lastName,
      phone: form.phone,
      delivery_type: form.deliveryType,
      meeting_location: form.meetingLocation,
      preferred_date: form.preferredDate,
      preferred_time: form.preferredTime,
      notes: form.notes,
      status: 'pending',
      items: cart.items.map(item => ({
        product_id: item.product.id,
        product_name: item.product.name,
        price: item.product.price
      })),
    };

    fetch('http://localhost:3344/api/orders/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(payload),
    })
    .then(async res => {
      const text = await res.text();
      if (!res.ok) throw new Error(text);
      return JSON.parse(text);
    })
    .then(data => {
      clearBackendCart();
      setShowModal(true);
    })
    .catch(err => {
      alert('Failed to place order.');
    });
  };

  const handleModalClose = () => {
    setShowModal(false);
    router.push('/');
  };

  const clearBackendCart = async () => {
    const token = localStorage.getItem('token');
    await fetch('http://localhost:3344/api/cart/clear/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  };

  if (loading) return <div className="text-center py-10 mt-12">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600 mt-12">{error}</div>;
  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-reu-cream">
        <div className="container mx-auto px-4 pt-32 pb-16">
          <h1 className="text-4xl font-bold text-reu-brown text-center mb-12">Checkout</h1>
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
    <div className="min-h-screen bg-reu-cream flex items-center justify-center">
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full flex flex-col items-center">
            <div className="text-3xl mb-4 text-green-600">✔️</div>
            <h2 className="text-xl font-bold mb-2 text-reu-brown">Order Confirmed!</h2>
            <p className="mb-6 text-center text-reu-brown">Thank you for your order.<br/>We will contact you soon.</p>
            <button
              onClick={handleModalClose}
              className="px-6 py-2 rounded-xl bg-reu-red text-white font-semibold text-lg shadow hover:bg-[#e65c4d] transition-colors"
            >
              Go to Home
            </button>
          </div>
        </div>
      )}
      <div className="w-full max-w-6xl h-[700px] bg-transparent flex flex-col md:flex-row items-stretch justify-center shadow-none">
        {/* Left: Form */}
        <form onSubmit={handleSubmit}
          className="flex-1 bg-white rounded-l-2xl shadow-xl p-10 flex flex-col gap-8 justify-between h-full min-w-[400px] max-w-[520px] overflow-y-auto"
        >
          <div className="flex-1 flex flex-col gap-8 overflow-y-auto">
            <div>
              <h2 className="text-2xl font-bold text-reu-red mb-4">Contact</h2>
              <div className="flex flex-col gap-4">
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder="Email Address"
                  className="rounded-xl border border-gray-300 px-4 py-3 w-full focus:border-reu-red focus:ring-2 focus:ring-reu-red outline-none"
                />
                <div className="flex gap-4">
                  <input name="firstName" type="text" value={form.firstName} onChange={handleChange}
                    placeholder="First Name"
                    className="rounded-xl border border-gray-300 px-4 py-3 w-full focus:border-reu-red focus:ring-2 focus:ring-reu-red outline-none"
                  />
                  <input name="lastName" type="text" value={form.lastName} onChange={handleChange}
                    placeholder="Last Name"
                    className="rounded-xl border border-gray-300 px-4 py-3 w-full focus:border-reu-red focus:ring-2 focus:ring-reu-red outline-none"
                  />
                </div>
                <input name="phone" type="tel" value={form.phone} onChange={handleChange}
                  placeholder="Phone Number"
                  className="rounded-xl border border-gray-300 px-4 py-3 w-full focus:border-reu-red focus:ring-2 focus:ring-reu-red outline-none"
                />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-reu-red mb-4">Delivery Type</h2>
              <select name="deliveryType" value={form.deliveryType} onChange={handleChange}
                className="rounded-xl border border-gray-300 px-4 py-3 w-full focus:border-reu-red focus:ring-2 focus:ring-reu-red outline-none"
              >
                <option value="pickup">รับเองที่จุดนัดพบ</option>
                <option value="delivery">Delivery</option>
              </select>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-reu-red mb-4">Delivery Detail</h2>
              <input
                type="text"
                name="meetingLocation"
                value={form.meetingLocation}
                onChange={handleChange}
                placeholder="Enter meeting location"
                className="rounded-xl border border-gray-300 px-4 py-3 w-full focus:border-reu-red focus:ring-2 focus:ring-reu-red outline-none"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-reu-red mb-4">Preferred Time</h2>
              <div className="flex gap-4 mb-4">
                <input name="preferredDate" type="date" value={form.preferredDate} onChange={handleChange}
                  className="rounded-xl border border-gray-300 px-4 py-3 w-full focus:border-reu-red focus:ring-2 focus:ring-reu-red outline-none"
                />
                <input name="preferredTime" type="time" value={form.preferredTime} onChange={handleChange}
                  className="rounded-xl border border-gray-300 px-4 py-3 w-full focus:border-reu-red focus:ring-2 focus:ring-reu-red outline-none"
                />
              </div>
              <input name="notes" type="text" value={form.notes} onChange={handleChange}
                placeholder="Notes for Seller"
                className="rounded-xl border border-gray-300 px-4 py-3 w-full focus:border-reu-red focus:ring-2 focus:ring-reu-red outline-none"
              />
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <Link href="/cart" className="text-reu-red font-semibold hover:underline">&lt; Return to Cart</Link>
            <button type="submit"
              className="px-8 py-3 rounded-xl bg-[#fa6a5b] text-white font-semibold text-lg shadow-lg hover:bg-[#e65c4d] transition-colors"
            >
              Confirm & Pay
            </button>
          </div>
        </form>

        {/* Order Summary */}
        <div className="flex-1 bg-reu-cream rounded-r-2xl shadow-xl p-10 flex flex-col gap-6 justify-between h-full min-w-[340px] max-w-[420px] overflow-y-auto">
          <div>
            {cart.items.map(item => (
              <div key={item.id} className="flex items-center gap-4 mb-2">
                <img src={item.product.image_url || '/placeholder-product.jpg'} alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-xl bg-white border"
                />
                <div className="flex-1">
                  <div className="font-bold text-reu-brown text-lg">{item.product.name}</div>
                </div>
                <div className="text-reu-brown text-lg font-medium">{item.product.price} THB</div>
              </div>
            ))}
            <div className="border-t border-reu-brown/20 my-4"></div>
            <div className="flex flex-col gap-2 text-reu-brown text-base">
              <div className="flex justify-between"><span>Subtotal</span><span>{subtotal} THB</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>Free</span></div>
              <div className="flex justify-between font-bold text-lg mt-2"><span>Total</span><span>{total} THB</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
