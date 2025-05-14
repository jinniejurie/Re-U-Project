"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import AccountSidebar from '@/components/AccountSidebar';

export default function AccountPage() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    router.push('/');
    window.dispatchEvent(new Event('authChange'));
  };
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/api/account/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUserData({
            firstName: data.user.first_name || '',
            lastName: data.user.last_name || '',
            username: data.user.username || '',
            email: data.user.email || '',
            phone: data.user.phone || '',
          });
        } else {
          setError(data.detail || 'Error fetching account data');
        }
      } catch (err) {
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      
      formData.append('first_name', userData.firstName);
      formData.append('last_name', userData.lastName);
      formData.append('phone', userData.phone);

      const response = await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/api/account/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to update profile');
      }

      setUserData(prev => ({
        ...prev,
        firstName: data.user.first_name || prev.firstName,
        lastName: data.user.last_name || prev.lastName,
        phone: data.user.phone || prev.phone,
      }));

      alert('Profile updated successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-reu-cream flex">
      {/* Sidebar */}
      <AccountSidebar active="account" />
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 pt-12 pb-8">
          <div className="flex flex-col md:flex-row items-stretch gap-12 max-w-5xl mx-auto">
            {/* Form Fields */}
            <form onSubmit={handleSave} className="flex-1 grid grid-cols-2 gap-x-6 gap-y-6 items-start text-reu-brown">
              <h1 className="col-span-2 text-3xl font-bold text-reu-brown mb-2">Account settings</h1>
              <div className="col-span-2 flex gap-4">
                <div className="flex-1">
                  <label className="block mb-2 font-medium">Full name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleInputChange}
                    placeholder="First name"
                    className="w-full rounded-md bg-gray-100 border-0 focus:ring-2 focus:ring-reu-red px-4 py-3 placeholder-gray-400"
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-2 font-medium invisible">Last name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last name"
                    className="w-full rounded-md bg-gray-100 border-0 focus:ring-2 focus:ring-reu-red px-4 py-3 placeholder-gray-400"
                  />
                </div>
              </div>
              <div className="col-span-2">
                <label className="block mb-2 font-medium">Username</label>
                <input
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={handleInputChange}
                  placeholder="Enter your username"
                  className="w-full rounded-md bg-gray-100 border-0 focus:ring-2 focus:ring-reu-red px-4 py-3 placeholder-gray-400"
                  readOnly
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-2 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full rounded-md bg-gray-100 border-0 focus:ring-2 focus:ring-reu-red px-4 py-3 placeholder-gray-400"
                  readOnly
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-2 font-medium">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="w-full rounded-md bg-gray-100 border-0 focus:ring-2 focus:ring-reu-red px-4 py-3 placeholder-gray-400"
                />
              </div>
              <div className="col-span-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-[#fa6a5b] text-white font-semibold text-base hover:bg-[#e65c4d] transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 