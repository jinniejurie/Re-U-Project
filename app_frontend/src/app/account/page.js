"use client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AccountPage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
    window.dispatchEvent(new Event('authChange'));
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateLoginStatus = () => setIsLoggedIn(!!localStorage.getItem('token'));
      updateLoginStatus();
      window.addEventListener('storage', updateLoginStatus);
      window.addEventListener('authChange', updateLoginStatus);
      return () => {
        window.removeEventListener('storage', updateLoginStatus);
        window.removeEventListener('authChange', updateLoginStatus);
      };
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-reu-cream">
      <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-8 text-reu-brown">Account</h1>
        <button
          onClick={handleLogout}
          className="w-full py-3 rounded-lg bg-reu-red text-white font-semibold text-base hover:bg-reu-brown transition-colors"
        >
          Log Out
        </button>
      </div>
    </div>
  );
} 