"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Inter, Unbounded } from "next/font/google";
import AccountSidebar from '@/components/AccountSidebar';

const unbounded = Unbounded({ subsets: ["latin"], weight: ["200", "300", "400", "500", "600", "700", "800", "900"] });

export default function Layout({ children }) {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isCollectionSection, setIsCollectionSection] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');


  const pathname = usePathname();
  const router = useRouter();

  const isAuthPage = pathname === '/login' || pathname === '/register';
  const isProductDetailPage = pathname.includes('/products/') && pathname.split('/').length > 3;
  const isProductPage = pathname === '/products';
  const isCartOrCheckoutPage = pathname === '/cart' || pathname === '/checkout';
  const isAccountPage = pathname.startsWith('/account') || pathname.startsWith('/register-seller');
  
  // Determine header colors based on scroll position and page
  const headerTextColor = isAccountPage
    ? 'text-reu-brown'
    : isProductDetailPage 
      ? 'text-reu-red' 
      : isAuthPage || isCartOrCheckoutPage
        ? 'text-reu-brown' 
        : isCollectionSection || (isProductPage && lastScrollY > window.innerHeight * 0.8)
          ? 'text-reu-brown' 
          : 'text-white';
  
  const headerHoverColor = isProductDetailPage 
    ? 'hover:text-reu-red/80' 
    : isAuthPage || isCartOrCheckoutPage
      ? 'hover:text-reu-red'
      : isCollectionSection || (isProductPage && lastScrollY > window.innerHeight * 0.8)
        ? 'hover:text-reu-red/80'
        : 'hover:text-reu-cream';

  // Add categories data
  const categories = [
    { title: "Clothing", link: "/products/clothing" },
    { title: "Accessories", link: "/products/accessories" },
    { title: "Books", link: "/products/books" },
    { title: "Electronics", link: "/products/electronics" },
    { title: "Sport Equipment", link: "/products/sport-equipment" },
    { title: "Stationary & Art Supplies", link: "/products/stationary-art" },
    { title: "Health & Beauty", link: "/products/health-beauty" },
    { title: "Other", link: "/products/other" }
  ];

  useEffect(() => {
    const controlHeader = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        const viewportHeight = window.innerHeight;

        // Check if we're in the collection section (approximately after one viewport height)
        setIsCollectionSection(currentScrollY >= viewportHeight * 0.8);

        if (currentScrollY > lastScrollY) {
          // Scrolling down
          setIsHeaderVisible(false);
        } else {
          // Scrolling up
          setIsHeaderVisible(true);
        }

        setLastScrollY(currentScrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlHeader);

      return () => {
        window.removeEventListener('scroll', controlHeader);
      };
    }
  }, [lastScrollY]);

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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      setIsSearchOpen(false);
      const query = encodeURIComponent(searchTerm.trim());
      router.push(`/products?search=${query}`);
    }
  };

  return (
    <div className={`min-h-screen ${unbounded.className}`}>
      {/* Side Navigation */}
      <div className={`fixed inset-0 z-50 transition-transform duration-500 ease-in-out ${isSideNavOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="absolute inset-0 bg-reu-cream">
          <div className="h-20 flex items-center justify-between px-6">
            <button
              onClick={() => setIsSideNavOpen(false)}
              className="text-reu-brown hover:text-reu-red transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="px-8 py-4">
            <ul className="space-y-6">
              <li>
                <Link
                  href="/"
                  onClick={() => setIsSideNavOpen(false)}
                  className="text-2xl text-reu-brown hover:text-reu-red transition-colors"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/products"
                  onClick={() => setIsSideNavOpen(false)}
                  className="text-2xl text-reu-brown hover:text-reu-red transition-colors"
                >
                  All Products
                </Link>
              </li>

              {/* Categories Dropdown */}
              <li>
                <button
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="flex items-center justify-between w-full text-2xl text-reu-brown hover:text-reu-red transition-colors group"
                >
                  <span>Categories</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-5 h-5 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Category List */}
                <div className={`overflow-hidden transition-all duration-200 ease-in-out ${isCategoryOpen ? 'mt-3' : 'mt-0 h-0'}`}>
                  <div className="pl-4 space-y-3">
                    {categories.map((category) => (
                      <Link
                        key={category.title}
                        href={category.link}
                        onClick={() => {
                          setIsCategoryOpen(false);
                          setIsSideNavOpen(false);
                        }}
                        className="block text-xl text-reu-brown/80 hover:text-reu-red transition-colors"
                      >
                        {category.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </li>

              <li>
                <Link
                  href="/dashboard"
                  onClick={() => setIsSideNavOpen(false)}
                  className="text-2xl text-reu-brown hover:text-reu-red transition-colors"
                >
                  Dashboard
                </Link>
                </li>
                
                <li>
                <Link
                  href="/about"
                  onClick={() => setIsSideNavOpen(false)}
                  className="text-2xl text-reu-brown hover:text-reu-red transition-colors"
                >
                  About
                </Link>
              </li>

            </ul>
          </nav>
        </div>
      </div>

      {/* Search Overlay */}
      <div className={`fixed inset-0 z-50 transition-opacity duration-500 ${isSearchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-reu-cream">
          <div className="h-20 flex items-center justify-start px-4">
            <button
              onClick={() => setIsSearchOpen(false)}
              className="text-reu-brown hover:text-reu-red transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="px-8 py-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search products..."
              className="w-full p-4 text-xl border-b-2 border-reu-brown bg-transparent focus:outline-none focus:border-reu-red"
            />
          </div>
        </div>
      </div>

      {/* Header */}
      <div className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ease-in-out ${isSideNavOpen ? 'opacity-0' : 'opacity-100'}`}>
        <header className="relative h-20 mx-auto">
          <nav className="content-container flex items-center justify-between w-full h-full px-6">
            <div className="flex-1 basis-0 h-full flex items-center">
              <div className="relative flex items-center h-full">
                <button
                  onClick={() => setIsSideNavOpen(true)}
                  className={`flex items-center justify-center text-reu-brown transition-colors`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-reu-brown">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                </button>
              </div>
            </div>
            <div className={`flex-1 basis-0 flex items-center justify-center transform transition-transform duration-500 ${isHeaderVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
              <Link href="/" className={`text-reu-brown text-3xl font-medium transition-colors`}>
                Re:U
              </Link>
            </div>
            <div className={`flex-1 basis-0 flex items-center justify-end gap-4 transform transition-transform duration-500 ${isHeaderVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`text-reu-brown transition-colors`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-reu-brown">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>
              <Link href="/cart" className={`text-reu-brown transition-colors`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-reu-brown">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </Link>
              <Link href={isLoggedIn ? "/account" : "/login"} className={`text-reu-brown transition-colors`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-reu-brown">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </Link>
            </div>
          </nav>
        </header>
      </div>

      {/* Main Content */}
      <main>
        {children}
      </main>
    </div>
  );
} 