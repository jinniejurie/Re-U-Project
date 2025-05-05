'use client';

import { useCart } from '@/context/CartContext';
import Footer from '@/components/Footer';
import Link from 'next/link';

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