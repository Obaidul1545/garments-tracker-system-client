import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useAxios from '../../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { Edit2, PlusCircle, Search, Trash2 } from 'lucide-react';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../../../hooks/useAuth';

const ManageProducts = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const axiosSecure = useAxios();

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['products', search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-products?search=${search}`);
      return res.data;
    },
  });

  const handleDeleteProduct = (id) => {
    console.log('Access token:', user?.accessToken);
    Swal.fire({
      title: 'Delete Product?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      background: '#ffffff',
      color: '#0F172A',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#0D9488',
      cancelButtonColor: '#d33',
      reverseButtons: true,
      customClass: {
        popup: 'rounded-2xl shadow-xl',
        confirmButton: 'px-6 py-2 rounded-xl font-semibold',
        cancelButton: 'px-6 py-2 rounded-xl font-semibold text-slate-700',
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/product/${id}`);

          if (res.data.deletedCount) {
            Swal.fire({
              title: 'Deleted!',
              text: 'Product has been removed successfully.',
              icon: 'success',
              confirmButtonColor: '#0D9488',
              customClass: {
                popup: 'rounded-2xl shadow-xl',
                confirmButton: 'px-6 py-2 rounded-xl font-semibold',
              },
            });
            refetch();
          }
        } catch (error) {
          Swal.fire({
            title: 'Failed!',
            text: 'Could not delete product.',
            icon: 'error',
            confirmButtonColor: '#EF4444',
          });
        }
      }
    });
  };

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

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="bg-white rounded-md shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#E2E8F0]">
                  <tr>
                    <th className="px-6 py-4 text-left text-[#0F172A]">
                      Image
                    </th>
                    <th className="px-6 py-4 text-left text-[#0F172A]">Name</th>
                    <th className="px-6 py-4 text-left text-[#0F172A]">
                      Price
                    </th>
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
                          src={product.image || product?.images?.[0]}
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
                          {product.paymentOptions}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/dashboard/update-product/${product._id}`}
                            className="p-2 text-[#0D9488] hover:bg-[#0D9488]/10 rounded-lg transition-colors"
                            title="Update product"
                          >
                            <Edit2 className="w-5 h-5" />
                          </Link>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
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
        )}
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
