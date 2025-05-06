'use client';

import { useCart } from '@/context/CartContext';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ProductDetail({ params }) {
  const { addToCart } = useCart();
  
  // Mock product data - in a real app, this would come from an API
  const product = {
    id: params.id,
    category: params.category,
    title: "Product Title",
    price: "1000THB",
    description: "This is a detailed product description. It includes information about the product's features, materials, and care instructions.",
    image: "/images/product1.jpg"
  };

  const handleAddToCart = () => {
    addToCart(product);
  };
export default function ProductDetail() {
  const params = useParams();
  const { category, id } = params;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`http://localhost:8000/products/${category}/${id}`);
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

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!product || product.error) return <div className="text-center py-10 text-red-600">Product not found.</div>;

  return (
    <div className="min-h-screen bg-reu-cream">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-reu-brown">{product.title}</h1>
            <p className="text-2xl text-reu-brown">{product.price}</p>
            <p className="text-reu-brown/80">{product.description}</p>
            
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-reu-red text-white py-3 rounded-lg hover:bg-reu-red/90 transition-colors"
              >
                Add to Cart
      <div className="container mx-auto px-4 flex items-center justify-center min-h-[calc(100vh-64px)] pt-8 sm:pt-12 md:pt-16">
        <div className="max-w-7xl w-full">
          {/* Back to Products Link */}
          <Link 
            href="/products" 
            className="inline-flex items-center text-reu-red hover:text-reu-brown transition-colors mb-6"
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
                  src={product.image} 
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl sm:text-4xl font-bold text-reu-brown mb-4">{product.name}</h1>
              <p className="text-xl sm:text-2xl text-reu-brown mb-6">{product.price} THB</p>
              
              <div className="mb-8">
                <h2 className="text-lg sm:text-xl font-semibold mb-2">Description</h2>
                <p className="text-reu-brown/80">{product.description}</p>
              </div>

              {/* Optional: Sizes (ถ้ายังใช้ mock อยู่ จะต้องแยกทำอีกที) */}
              <div className="mb-8">
                <h2 className="text-lg sm:text-xl font-semibold mb-4">Size</h2>
                <div className="flex gap-4">
                  {["S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-reu-brown rounded-lg flex items-center justify-center hover:bg-reu-red hover:text-white hover:border-reu-red transition-colors"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <button className="bg-reu-red text-white py-3 sm:py-4 px-6 sm:px-8 rounded-full hover:bg-reu-red/90 transition-colors text-base sm:text-lg font-medium">
                Add To Cart
              </button>
              <Link
                href="/cart"
                className="flex-1 bg-reu-brown text-white py-3 rounded-lg hover:bg-reu-brown/90 transition-colors text-center"
              >
                View Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
