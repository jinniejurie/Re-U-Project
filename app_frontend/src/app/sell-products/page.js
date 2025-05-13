"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AccountSidebar from '@/components/AccountSidebar';

const PRODUCT_API_URL = 'http://localhost:3344';

export default function SellProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    condition: 'new',
    category: '',
    image: null
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
        console.log('Fetching products...');
        // Fetch user's products
        const productsResponse = await fetch(`${PRODUCT_API_URL}/api/products/seller/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log('Products response status:', productsResponse.status);
        const productsData = await productsResponse.json();
        console.log('Products data:', productsData);
        
        if (productsResponse.ok) {
          setProducts(productsData);
        } else {
          console.error('Failed to fetch products:', productsData);
          setError(`Failed to fetch products: ${productsData.detail || 'Unknown error'}`);
        }

        console.log('Fetching categories...');
        // Fetch categories with authorization
        const categoriesResponse = await fetch(`${PRODUCT_API_URL}/api/products/categories/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log('Categories response status:', categoriesResponse.status);
        const categoriesData = await categoriesResponse.json();
        console.log('Categories data:', categoriesData);
        
        if (categoriesResponse.ok) {
          setCategories(categoriesData);
        } else {
          console.error('Failed to fetch categories:', categoriesData);
          setError(`Failed to fetch categories: ${categoriesData.detail || 'Unknown error'}`);
        }
      } catch (err) {
        console.error('Error in fetchData:', err);
        setError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewProduct(prev => ({
      ...prev,
      image: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      
      Object.keys(newProduct).forEach(key => {
        if (newProduct[key] !== null) {
          formData.append(key, newProduct[key]);
        }
      });

      console.log('Submitting new product...');
      const response = await fetch(`${PRODUCT_API_URL}/api/products/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      console.log('Submit response status:', response.status);
      const data = await response.json();
      console.log('Submit response data:', data);
      
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to create product');
      }

      setProducts(prev => [...prev, data]);
      setNewProduct({
        name: '',
        description: '',
        price: '',
        condition: 'new',
        category: '',
        image: null
      });
      
      alert('Product created successfully!');
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-reu-cream flex items-center justify-center">
        <div className="text-reu-brown text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-reu-cream flex">
      <AccountSidebar active="sell" />
      
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-reu-brown mb-8 mt-10">Sell Products</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          {/* Add New Product Form */}
          <div className="bg-white rounded-2xl shadow p-6 mb-8">
            <h2 className="text-xl font-semibold text-reu-brown mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-reu-brown mb-1">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  className="w-full rounded-md bg-gray-100 border-0 focus:ring-2 focus:ring-reu-red px-4 py-2"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-reu-brown mb-1">Description</label>
                <textarea
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  className="w-full rounded-md bg-gray-100 border-0 focus:ring-2 focus:ring-reu-red px-4 py-2"
                  rows="3"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-reu-brown mb-1">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    className="w-full rounded-md bg-gray-100 border-0 focus:ring-2 focus:ring-reu-red px-4 py-2"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-reu-brown mb-1">Condition</label>
                  <select
                    name="condition"
                    value={newProduct.condition}
                    onChange={handleInputChange}
                    className="w-full rounded-md bg-gray-100 border-0 focus:ring-2 focus:ring-reu-red px-4 py-2"
                    required
                  >
                    <option value="new">New</option>
                    <option value="used">Used</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-reu-brown mb-1">Category</label>
                <select
                  name="category"
                  value={newProduct.category}
                  onChange={handleInputChange}
                  className="w-full rounded-md bg-gray-100 border-0 focus:ring-2 focus:ring-reu-red px-4 py-2"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-reu-brown mb-1">Product Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  className="w-full rounded-md bg-gray-100 border-0 focus:ring-2 focus:ring-reu-red px-4 py-2"
                  accept="image/*"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-reu-red text-white py-2 px-4 rounded-md hover:bg-reu-red/90 transition-colors"
                disabled={loading}
              >
                {loading ? 'Adding Product...' : 'Add Product'}
              </button>
            </form>
          </div>
          
          {/* Product List */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold text-reu-brown mb-4">Your Products</h2>
            {products.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No products found. Add your first product above!</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {products.map(product => (
                  <li key={product.id} className="flex items-center gap-4 py-4">
                    {product.image && (
                      <img
                        src={product.image ? (product.image.startsWith('http') ? product.image : `http://localhost:3344${product.image.startsWith('/') ? '' : '/media/'}${product.image}`) : '/placeholder-product.jpg'}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg border"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-lg text-reu-brown truncate">{product.name}</span>
                        <span className="text-reu-red font-semibold ml-4">฿{product.price}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <span>Condition: {product.condition}</span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1 truncate">{product.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 