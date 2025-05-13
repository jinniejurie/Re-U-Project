"use client";
import { useEffect, useState } from 'react';

const statusColor = {
  Completed: 'bg-green-100 text-green-700',
  Processing: 'bg-purple-100 text-purple-700',
  Refund: 'bg-red-100 text-red-700',
  Delivered: 'text-reu-red',
  Shipping: 'text-reu-red',
  Cancelled: 'text-reu-red',
};

function SellerOrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/seller/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="p-8 w-full">
      <h2 className="text-3xl font-bold text-reu-brown mb-8 mt-12">Dashboard / Order Lists</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-reu-red text-white">
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">NAME</th>
              <th className="px-4 py-3 text-left">ADDRESS</th>
              <th className="px-4 py-3 text-left">DATE</th>
              <th className="px-4 py-3 text-left">TYPE</th>
              <th className="px-4 py-3 text-left">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-b last:border-0">
                <td className="px-4 py-3">{order.id}</td>
                <td className="px-4 py-3">{`${order.first_name} ${order.last_name}`}</td>
                <td className="px-4 py-3">{order.meeting_location}</td>
                <td className="px-4 py-3">{new Date(order.created_at).toLocaleDateString()}</td>
                <td className="px-4 py-3">{order.delivery_type}</td>
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[order.status]}`}>{order.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BuyerOrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/buyer/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="p-8 w-full">
      <h2 className="text-3xl font-bold text-reu-brown mb-8 mt-12">Dashboard - Order History</h2>
      <div className="flex flex-col gap-8">
        {orders.map((order) => (
          <div key={order.id} className="flex items-center gap-8 bg-white rounded-xl p-6 shadow">
            {order.items[0]?.product?.image && (
              <img 
                src={order.items[0].product.image} 
                alt={order.items[0].product_name} 
                className="w-32 h-32 object-cover rounded-xl border-2 border-reu-brown" 
              />
            )}
            <div className="flex-1">
              <div className="text-xl font-semibold text-reu-brown">
                {order.items.map(item => item.product_name).join(', ')}
              </div>
              <div className="text-reu-red font-semibold">Order #{order.id}</div>
            </div>
            <div className="text-lg font-semibold text-reu-red">{order.status}</div>
            <button className="ml-8 text-reu-red hover:text-reu-brown">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function CombinedSidebar({ isSeller, active, setActive }) {
  return (
    <aside className="w-72 bg-[#FFF6D6] flex flex-col justify-between py-8 px-6 h-screen border-r border-reu-brown/10 mt-0 sticky top-0">
      <nav className="flex flex-col gap-8">
        {isSeller && (
          <div>
            <div className="font-bold text-lg text-reu-brown mb-2 mt-12">Seller</div>
            <button onClick={() => setActive('seller-orders')} className={`block w-full text-left px-4 py-3 rounded-lg font-semibold transition-colors mb-2 ${active === 'seller-orders' ? 'bg-reu-brown text-white' : 'text-reu-brown hover:bg-reu-brown/10'}`}>Order Lists</button>
            {/* Add more seller menu items here */}
          </div>
        )}
        <div>
          <div className="font-bold text-lg text-reu-brown mb-2 mt-12">Buyer</div>
          <button onClick={() => setActive('buyer-orders')} className={`block w-full text-left px-4 py-3 rounded-lg font-semibold transition-colors mb-2 ${active === 'buyer-orders' ? 'bg-reu-brown text-white' : 'text-reu-brown hover:bg-reu-brown/10'}`}>Order History</button>
          {/* Add more buyer menu items here */}
        </div>
      </nav>
      <button
        onClick={() => {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            window.location.href = '/';
            window.dispatchEvent(new Event('authChange'));
          }
        }}
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-reu-brown font-semibold hover:bg-reu-red/10 hover:text-reu-red transition-colors mt-8"
      >
        Log out
      </button>
    </aside>
  );
}

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [active, setActive] = useState('buyer-orders');

  useEffect(() => {
    async function fetchUser() {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/login';
          return;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/api/account/`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await res.json();
        setUser(data.user);
        if (data.user.is_seller) setActive('seller-orders');
      }
    }
    fetchUser();
  }, []);

  if (!user) return <div className="min-h-screen flex items-center justify-center text-reu-brown text-xl">Loading...</div>;

  return (
    <div className="min-h-screen bg-reu-cream flex">
      <CombinedSidebar isSeller={user.is_seller} active={active} setActive={setActive} />
      <div className="flex-1">
        {active === 'seller-orders' && user.is_seller && <SellerOrderList />}
        {active === 'buyer-orders' && <BuyerOrderHistory />}
      </div>
    </div>
  );
} 