"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getValidAccessToken } from '@/utils/auth';

export default function AccountPage() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    router.push('/');
    window.dispatchEvent(new Event('authChange'));
  };

  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await getValidAccessToken(); // ใช้ฟังก์ชันในการเช็คและดึง access token

        const response = await fetch('http://localhost:3345/api/account/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUserData(data.user);
        } else {
          setError(data.detail || 'Error fetching account data');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to fetch user data');
      } finally {
        setLoading(false); // ให้โหลดเสร็จแล้ว
      }
    };

    fetchUserData();
  }, [router]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-reu-cream">
      <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-8 text-reu-brown">Account</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {userData ? (
          <div className="text-left">
            <p><strong>Username:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {userData.email}</p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}

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