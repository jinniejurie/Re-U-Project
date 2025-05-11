'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Checkout() {
  const router = useRouter();
  // ดึงตะกร้าจาก localStorage
  const [cartItems, setCartItems] = useState([]);
  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    deliveryType: '',
    meetingLocation: '',
    preferredDate: '',
    preferredTime: '',
    notes: '',
  });

  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch (e) {
        console.error('Invalid cart JSON', e);
      }
    }
  }, []);

  // คำนวณยอดรวม (quantity=1 เสมอ)
  const subtotal = cartItems.reduce((sum, i) => sum + i.product_price, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // เตรียม payload ให้ตรงกับ serializer ฝั่ง Django (ไม่มี quantity)
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
      items: cartItems.map(i => ({
        product_name: i.product_name,
        price: i.product_price
      })),
    };

    fetch('http://localhost:3344/api/orders/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`, // ถ้าใช้ JWT
      },
      body: JSON.stringify(payload),
    })
    .then(async res => {
      const text = await res.text();
      console.log('Raw response:', text);
      if (!res.ok) throw new Error(text);
      return JSON.parse(text);
    })
    .then(data => {
      alert(`Order confirmed!`);
      localStorage.removeItem('cart');
      router.push('/');
    })
    .catch(err => {
      console.error('Order failed:', err);
      alert('Failed to place order.');
    });
  };

  return (
    <div className="min-h-screen bg-reu-cream flex items-center justify-center">
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
                <option value="">รับเองที่จุดนัดพบ</option>
                <option value="delivery">Delivery</option>
              </select>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-reu-red mb-4">Delivery Detail</h2>
              <select name="meetingLocation" value={form.meetingLocation} onChange={handleChange}
                className="rounded-xl border border-gray-300 px-4 py-3 w-full focus:border-reu-red focus:ring-2 focus:ring-reu-red outline-none"
              >
                <option value="">Meeting Location</option>
                <option value="location1">Location 1</option>
                <option value="location2">Location 2</option>
              </select>
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
            {cartItems.map(item => (
              <div key={item.product_id} className="flex items-center gap-4 mb-2">
                <img src={item.image || '/placeholder-product.jpg'} alt={item.product_name}
                  className="w-20 h-20 object-cover rounded-xl bg-white border"
                />
                <div className="flex-1">
                  <div className="font-bold text-reu-brown text-lg">{item.product_name}</div>
                </div>
                <div className="text-reu-brown text-lg font-medium">{item.product_price} THB</div>
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
