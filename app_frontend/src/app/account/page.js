"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function AccountPage() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    photo: null,
  });
  const [error, setError] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef();

  const handleLogout = () => {
    localStorage.removeItem('token');
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
        const response = await fetch('http://localhost:3345/api/account/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUserData(prev => ({
            ...prev,
            username: data.user.username || '',
            email: data.user.email || '',
          }));
        } else {
          setError(data.detail || 'Error fetching account data');
        }
      } catch (err) {
        setError('Failed to fetch user data');
      }
    };
    fetchUserData();
  }, [router]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserData(prev => ({ ...prev, photo: file }));
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // TODO: Implement save logic (API call)
    alert('Changes saved (not really, this is a placeholder)!');
  };

  return (
    <div className="min-h-screen bg-reu-cream flex">
      {/* Sidebar */}
      <aside className="w-72 bg-[#FFF6D6] flex flex-col justify-between py-8 px-6 h-screen border-r border-reu-brown/10 mt-0">
        <nav className="flex flex-col gap-4">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg text-reu-brown font-semibold hover:bg-reu-brown/10 transition-colors mt-10">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" /></svg>
            Dashboard
          </Link>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-reu-brown text-white font-semibold cursor-default">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Account Settings
            </div>
            <Link href="/register-seller" className="flex items-center gap-3 px-4 py-3 rounded-lg text-reu-brown font-semibold hover:bg-reu-brown/10 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              Sell with us
            </Link>
          </div>
        </nav>
        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-lg text-reu-brown font-semibold hover:bg-reu-red/10 hover:text-reu-red transition-colors mt-8">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" /></svg>
          Log Out
        </button>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 pt-12 pb-8">
          <div className="flex flex-col md:flex-row items-stretch gap-12 max-w-5xl mx-auto">
            {/* Profile Photo Card */}
            <div className="bg-white rounded-2xl shadow p-10 flex flex-col justify-center items-center w-full max-w-xs border border-gray-200 h-full">
              <div className="relative w-64 h-64 mb-4">
                <img
                  src={photoPreview || '/default-profile.png'}
                  alt="Profile Preview"
                  className="w-full h-full object-cover rounded-xl border"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  ref={fileInputRef}
                  onChange={handlePhotoChange}
                />
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-40 text-white text-center py-2 rounded-b-xl cursor-pointer" onClick={() => fileInputRef.current.click()}>
                  <span className="inline-flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" /></svg>
                    Upload Photo
                  </span>
                </div>
              </div>
            </div>
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
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-2 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  placeholder="Email address"
                  className="w-full rounded-md bg-gray-100 border-0 focus:ring-2 focus:ring-reu-red px-4 py-3 placeholder-gray-400"
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-2 font-medium">Phone number</label>
                <input
                  type="tel"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                  placeholder="xxx-xxx-xxxx"
                  className="w-full rounded-md bg-gray-100 border-0 focus:ring-2 focus:ring-reu-red px-4 py-3 placeholder-gray-400"
                />
              </div>
              <div className="col-span-2 mt-2 flex justify-end">
                <button type="submit" className="px-8 py-3 rounded-lg bg-[#fa6a5b] text-white font-semibold text-base hover:bg-[#e65c4d] transition-colors">
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