import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function AccountSidebar({ active }) {
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3345/api/account/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setIsSeller(data.user.is_seller);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <aside className="w-72 bg-[#FFF6D6] flex flex-col justify-between py-8 px-6 h-screen border-r border-reu-brown/10 mt-0 sticky top-0">
      <nav className="flex flex-col gap-4">
        <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg text-reu-brown font-semibold hover:bg-reu-brown/10 transition-colors mt-10">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" /></svg>
          Dashboard
        </Link>
        <div className="flex flex-col gap-4">
          <Link href="/account" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors ${active === 'account' ? 'bg-reu-brown text-white cursor-default' : 'text-reu-brown hover:bg-reu-brown/10'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Account Settings
          </Link>
          {isSeller ? (
            <Link href="/sell-products" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors ${active === 'sell' ? 'bg-reu-brown text-white cursor-default' : 'text-reu-brown hover:bg-reu-brown/10'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
              Sell Products
            </Link>
          ) : (
            <Link href="/register-seller" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors ${active === 'sell' ? 'bg-reu-brown text-white cursor-default' : 'text-reu-brown hover:bg-reu-brown/10'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              Sell with us
            </Link>
          )}
        </div>
      </nav>
      <button onClick={() => { localStorage.removeItem('token'); window.location.href = '/'; window.dispatchEvent(new Event('authChange')); }} className="flex items-center gap-3 px-4 py-3 rounded-lg text-reu-brown font-semibold hover:bg-reu-red/10 hover:text-reu-red transition-colors mt-8">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" /></svg>
        Log Out
      </button>
    </aside>
  );
}