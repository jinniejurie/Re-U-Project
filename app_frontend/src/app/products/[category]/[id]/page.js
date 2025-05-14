'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductDetail() {
  const params = useParams();
  const { category, id } = params;
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${category}/${id}/`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    }

    if (category && id) {
      fetchProduct();
    }
  }, [category, id]);

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: product.id }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.errors || 'Failed to add to cart');
      }
      router.push('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!product || product.error) return <div className="text-center py-10 text-red-600 mt-12">Product not found.</div>;

  return (
    <div className="min-h-screen bg-reu-cream">
      <div className="container mx-auto px-4 flex items-center justify-center min-h-[calc(100vh-64px)] pt-8 sm:pt-12 md:pt-16">
        <div className="max-w-7xl w-full">
          {/* Back to Products Link */}
          <Link 
            href="/products" 
            className="inline-flex items-center text-reu-red hover:text-reu-brown transition-colors mb-6 mt-16 sm:mt-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Products
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Product Image */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="aspect-square relative">
                <img
                  src={product.image ? (product.image.startsWith('http') ? product.image : `${process.env.NEXT_PUBLIC_API_URL}${product.image.startsWith('/') ? '' : '/'}${product.image}`) : '/placeholder-product.jpg'}
                  alt={product.name}
                  className="object-cover w-full h-full"
                  style={{ objectFit: 'cover', width: '100%', height: '100%', position: 'absolute', inset: 0 }}
                  crossOrigin="anonymous"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl sm:text-4xl font-bold text-reu-brown mb-4">{product.name}</h1>
              <p className="text-xl sm:text-2xl text-reu-brown mb-6">{product.price} THB</p>
              
              <div className="mb-8">
                <h2 className="text-lg sm:text-xl text-reu-brown font-semibold mb-2">Description</h2>
                <p className="text-reu-brown/80">{product.description}</p>
              </div>

              {/* Seller Information */}
              {product.seller && (
                <div className="mb-8 p-6 bg-white rounded-xl shadow-md border border-reu-brown/10 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-reu-red/10 flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-reu-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl text-reu-brown font-semibold">Seller Information</h2>
                    </div>
                  </div>
                  <div className="pl-14">
                    <p className="text-reu-brown/90 font-medium">
                      {product.seller.first_name && product.seller.last_name 
                        ? `${product.seller.first_name} ${product.seller.last_name}`
                        : product.seller.username}
                    </p>
                    <div className="mt-2 flex items-center text-sm text-reu-brown/70">
                    </div>
                  </div>
                </div>
              )}

              <button 
                onClick={handleAddToCart}
                disabled={addingToCart}
                className={`bg-reu-red text-white py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-colors text-base sm:text-lg font-medium ${
                  addingToCart ? 'opacity-50 cursor-not-allowed' : 'hover:bg-reu-red/90'
                }`}
              >
                {addingToCart ? 'Adding to Cart...' : 'Add To Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}