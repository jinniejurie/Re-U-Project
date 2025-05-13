'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';

const CategoryCard = ({ title, image, link }) => (
  <Link href={link} className="block group">
    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
        <h3 className="text-white text-2xl font-bold p-6">{title}</h3>
      </div>
    </div>
  </Link>
);

const ProductPreview = ({ product }) => (
  <Link href={`/products/${product.category}/${product.id}`} className="block">
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-square">
        <img 
          src={product.image ? (product.image.startsWith('http') ? product.image : `http://localhost:3344${product.image.startsWith('/') ? '' : '/media/'}${product.image}`) : '/placeholder-product.jpg'}
          alt={product.name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-reu-brown">{product.name}</h3>
        <p className="text-reu-brown/80">{product.price} THB</p>
      </div>
    </div>
  </Link>
);

export default function Home() {
  const categoriesRef = useRef(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  const scrollToCategories = () => {
    categoriesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        const response = await fetch('http://localhost:3344/products/');
        if (!response.ok) {
          throw new Error('Failed to fetch featured products');
        }
        const data = await response.json();
        console.log('API Response:', data);
        setFeaturedProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedProducts();
  }, []);


  // Mock data for categories
  const categories = [
    {
      title: "Clothing",
      image: "/images/clothing-category.avif",
      link: "/products/clothing"
    },
    {
      title: "Accessories",
      image: "/images/accessories-category.avif",
      link: "/products/accessories"
    },
    {
      title: "Books",
      image: "/images/books-category.jpg",
      link: "/products/books"
    },
    {
      title: "Electronics",
      image: "/images/electronics-category.avif",
      link: "/products/electronics"
    },
    {
      title: "Sport Equipment",
      image: "/images/sport-category.jpg",
      link: "/products/sport-equipment"
    },
    {
      title: "Stationary & Art Supplies",
      image: "/images/stationary-category.jpg",
      link: "/products/stationary-art"
    },
    {
      title: "Health & Beauty",
      image: "/images/health-beauty-category.avif",
      link: "/products/health-beauty"
    },
    {
      title: "Other",
      image: "/images/other-category.avif",
      link: "/products/other"
    }
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-t from-reu-cream to-reu-red min-h-screen">
        <div className="relative h-screen">
          <div className="absolute inset-0"/>
          <div className="absolute inset-0 flex items-center justify-center mx-2">
            <div className="text-center text-reu-brown">
              <h2 className="text-4xl font-bold mb-6">Re:U Life, TU Style</h2>
              <h1 className="text-7xl font-extrabold tracking-wider text-reu-cream mb-12" style={{
                WebkitTextStroke: '2px #501c17',
                letterSpacing: '0.05em',
                filter: 'drop-shadow(2px 2px 0 #501c17)',
                paddingBottom: '0.1em',
                lineHeight: '1.2',
              }}>Your Stuff, Their Story</h1>
              <div className="grid grid-cols-3 gap-6 mt-8 mx-4">
                <div className="flex flex-col items-center justify-center h-full">
                  <h2 className="text-2xl font-medium mb-2">Find your next favorite</h2>
                  <p className="text-sm max-w-xs">
                    From books to bags to bikes discover what your campus has to offer without breaking your wallet.
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center h-full">
                  <h3 className="text-2xl font-medium mb-2">Make it Yours</h3>
                  <p className="text-sm max-w-xs">
                    Style it, use it, show it off with pride
                    and purpose. Every item has a story,
                    now it continues with you.
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center h-full">
                  <h3 className="text-2xl font-medium mb-2">Send it on its way</h3>
                  <p className="text-sm max-w-xs">
                    Let your unused stuff spark joy again
                    for someone else in TU who&apos;ll love it just as much.
                  </p>
                </div>
              </div>
              <button 
                onClick={scrollToCategories}
                className="px-8 py-3 bg-gradient-to-r from-reu-cream to-reu-pink text-reu-brown rounded-full border-2 border-reu-brown hover:opacity-90 transition-all font-normal mt-12"
              >
                Explore Now!
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section ref={categoriesRef} className="py-20 bg-reu-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-reu-brown text-center mb-12">Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.title} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gradient-to-t from-reu-pink to-reu-cream">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-reu-brown">Featured Products</h2>
            <Link 
              href="/products" 
              className="text-reu-red hover:text-reu-brown transition-colors flex items-center gap-2"
            >
              View All
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          {loading ? (
            <div className="text-center text-reu-brown text-xl">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductPreview 
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
} 