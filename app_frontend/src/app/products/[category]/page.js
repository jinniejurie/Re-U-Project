'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

const ProductCard = ({ image, title, price, id, category }) => (
  <Link href={`/products/${category}/${id}`} className="block">
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-square">
        <img 
          src={image || "/placeholder-product.jpg"} 
          alt={title} 
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-reu-brown">{title || "Product"}</h3>
        <p className="text-reu-brown/80">{price || "1000THB"}</p>
      </div>
    </div>
  </Link>
);

export default function CategoryPage() {
  const params = useParams();
  const category = params.category;

  // Mock data - replace with actual data later
  const categoryProducts = [
    { id: 1, image: "/images/product1.jpg", title: "Num Num Shirt", price: "1000THB", category: "clothing" },
    { id: 2, image: "/images/product2.jpg", title: "Cool Pants", price: "1000THB", category: "clothing" },
    // Add more products for each category
  ].filter(product => product.category === category);

  const categoryTitles = {
    clothing: "Clothing",
    accessories: "Accessories",
    books: "Books",
    electronics: "Electronics"
  };

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
            <ProductCard 
              key={product.id}
              {...product}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 