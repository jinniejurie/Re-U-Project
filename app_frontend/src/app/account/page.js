"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import AccountSidebar from '@/components/AccountSidebar';

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
        const token = await getValidAccessToken(); // ใช้ฟังก์ชันในการเช็คและดึง access token

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
      } finally {
        setLoading(false); // ให้โหลดเสร็จแล้ว
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
      <AccountSidebar active="account" />
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