import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BiSearch } from 'react-icons/bi';
import { useQuery } from '@tanstack/react-query';
import ProductsCard from './ProductsCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AllProducts = () => {
  const [search, setSearch] = useState('');
  const axiosSecure = useAxiosSecure();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-products?search=${search}`);
      return res.data;
    },
  });

  return (
    <div>
      <div className=" py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-[#0F172A] text-3xl font-semibold mb-4">
              All Products
            </h1>
            <p className="text-[#475569] max-w-2xl mx-auto mb-8">
              Browse our complete collection of premium garments manufactured
              with precision and care
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <BiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#475569]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products by name, category..."
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#0D9488] focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
          </motion.div>

          {/* Products Count */}
          <div className="mb-6">
            <p className="text-[#475569]">
              Showing {products.length} of {products.length} products
            </p>
          </div>

          {/* All Products*/}
          {isLoading ? (
            <LoadingSpinner></LoadingSpinner>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <ProductsCard
                  key={product._id}
                  product={product}
                  index={index}
                ></ProductsCard>
              ))}
            </div>
          )}

          {/* No Results */}
          {products.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#475569] mb-4">
                No products found matching your search.
              </p>
              <button
                onClick={() => setSearch('')}
                className="px-6 py-3 bg-[#0D9488] text-white rounded-xl hover:bg-[#0D9488]/90 transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
