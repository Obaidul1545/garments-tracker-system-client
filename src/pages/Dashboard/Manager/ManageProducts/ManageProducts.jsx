import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useAxios from '../../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { Edit2, PlusCircle, Search, Trash2 } from 'lucide-react';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { RiEdit2Fill } from 'react-icons/ri';
import { Link } from 'react-router';

const ManageProducts = () => {
  const [search, setSearch] = useState('');
  const axiosInstance = useAxios();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', search],
    queryFn: async () => {
      const res = await axiosInstance.get(`/all-products?search=${search}`);
      return res.data;
    },
  });

  // search home name and catatory dia

  const handleDelete = (id) => {};

  return (
    <div className="container mx-auto">
      <div className="space-y-6 px-3 sm:px-4 lg:px-4 py-5">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-[#0F172A] text-3xl font-semibold mb-2">
              Manage Products
            </h1>
            <p className="text-[#475569]">View and manage your products</p>
          </div>
          <Link
            to="/dashboard/add-product"
            className="flex items-center gap-2 px-6 py-3 bg-[#0D9488] text-white rounded-md hover:bg-[#0D9488]/90 transition-colors"
          >
            <PlusCircle className="w-5 h-5" />
            Add Product
          </Link>
        </div>

        <div className="bg-white rounded-md p-6 shadow-md">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#475569]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0D9488] focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <div className="bg-white rounded-md shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#E2E8F0]">
                <tr>
                  <th className="px-6 py-4 text-left text-[#0F172A]">Image</th>
                  <th className="px-6 py-4 text-left text-[#0F172A]">Name</th>
                  <th className="px-6 py-4 text-left text-[#0F172A]">Price</th>
                  <th className="px-6 py-4 text-left text-[#0F172A]">
                    Payment Mode
                  </th>
                  <th className="px-6 py-4 text-left text-[#0F172A]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product, index) => (
                  <motion.tr
                    key={product._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[#0F172A]">{product.title}</div>
                      <div className="text-[#475569]">{product.category}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[#0D9488]">${product.price}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[#475569]">
                        {product.paymentMode}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 text-[#0D9488] hover:bg-[#0D9488]/10 rounded-lg transition-colors"
                          title="Edit product"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete a product"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

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
  );
};

export default ManageProducts;
