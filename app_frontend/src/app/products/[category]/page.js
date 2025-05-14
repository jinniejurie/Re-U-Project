'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Footer from '@/components/Footer';

const ProductCard = ({ image, title, price, id, category }) => (
  <Link href={`/products/${category}/${id}`} className="block">
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-square">
        <img 
          src={image ? (image.startsWith('http') ? image : `${process.env.NEXT_PUBLIC_API_URL}${image.startsWith('/') ? '' : '/media/'}${image}`) : '/placeholder-product.jpg'}
          alt={title} 
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-reu-brown">{title}</h3>
        <p className="text-reu-brown/80">{price} THB</p>
      </div>
    </div>
  </Link>
);

export default function CategoryPage() {
  const params = useParams();
  const category = params.category;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categorySlugToName = {
    clothing: "clothing",
    accessories: "accessories",
    books: "books",
    electronics: "electronics",
    "sport-equipment": "sport equipment",
    "stationary-art": "stationary & art supplies",
    "health-beauty": "health & beauty",
    other: "other"
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const backendCategory = categorySlugToName[category] || category;
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${backendCategory}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchProducts();
    }
  }, [category]);

  const categoryTitles = {
    clothing: "Clothing",
    accessories: "Accessories",
    books: "Books",
    electronics: "Electronics",
    "sport-equipments": "Sport Equipment",
    "stationary-art": "Stationary & Art Supplies",
    "health-beauty": "Health & Beauty",
    other: "Other"
  };

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
            {categoryTitles[category] || category}
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light">
            Find your perfect match
          </p>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-reu-brown text-center mb-12">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h2>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product.id}
              image={product.image}
              title={product.name}
              price={product.price}
              id={product.id}
              category={product.category}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
} 