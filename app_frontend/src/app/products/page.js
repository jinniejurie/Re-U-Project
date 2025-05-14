'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

const ProductCard = ({ product }) => (
  <Link href={`/products/${product.category}/${product.id}`} className="block">
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-square">
        <Image 
          src={product.image ? (product.image.startsWith('http') ? product.image : `${process.env.NEXT_PUBLIC_API_URL}${product.image.startsWith('/') ? '' : '/media/'}${product.image}`) : '/placeholder-product.jpg'}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-reu-brown">{product.name}</h3>
        <p className="text-reu-brown/80">{product.price} THB</p>
      </div>
    </div>
  </Link>
);

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const category = searchParams.get('category');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = category 
          ? `${process.env.NEXT_PUBLIC_API_URL}/products/${category}/`
          : `${process.env.NEXT_PUBLIC_API_URL}/products/`;
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();

        const filteredProducts = data.filter(product => 
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setProducts(filteredProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen bg-reu-cream flex items-center justify-center">
        <div className="text-reu-brown text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-reu-cream flex items-center justify-center">
        <div className="text-reu-red text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-reu-cream">
      {/* Hero Section */}
      <div className="w-full bg-reu-red text-white">
        <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-wider">
            Secondhand?
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light">
            more like second glam!
          </p>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-reu-brown text-center mb-12">
          {category ? `${category.charAt(0).toUpperCase() + category.slice(1)}` : 'All Products'}
        </h2>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function ProductsPageWrapper() {
  return (
    <Suspense>
      <Products />
    </Suspense>
  );
} 