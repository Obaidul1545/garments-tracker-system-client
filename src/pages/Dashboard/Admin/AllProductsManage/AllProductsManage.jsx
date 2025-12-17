import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Search, Trash2 } from 'lucide-react';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { RiEdit2Fill } from 'react-icons/ri';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const AllProductsManage = () => {
  const [search, setSearch] = useState('');
  const [loadingId, setLoadingId] = useState(null);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleToggleShowOnHome = async (product) => {
    try {
      setLoadingId(product._id);
      await axiosSecure.patch(`/products/${product._id}/show-on-home`, {
        showOnHome: !product.showOnHome,
      });
      setLoadingId(null);
      toast.success(product.showOnHome ? 'Removed from Home' : 'Added to Home');
      refetch();
    } catch (error) {
      console.error(error);
      toast.error('Failed to update');
    }
  };

  const handleDeleteProduct = (id) => {
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
        <div>
          <h1 className="text-[#0F172A] text-3xl font-semibold mb-2">
            All Products
          </h1>
          <p className="text-[#475569]">Manage all products in the system</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#475569]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0D9488] focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#E2E8F0]">
                  <tr>
                    <th className="px-6 py-4 text-left text-[#0F172A]">
                      Image
                    </th>
                    <th className="px-6 py-4 text-left text-[#0F172A]">
                      Product Name
                    </th>
                    <th className="px-6 py-4 text-left text-[#0F172A]">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-[#0F172A]">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-[#0F172A]">
                      Created By
                    </th>
                    <th className="px-6 py-4 text-left text-[#0F172A]">
                      Show on Home
                    </th>
                    <th className="px-6 py-4 text-left text-[#0F172A]">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {products?.map((product, index) => (
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
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-[#0D9488]/10 text-[#0D9488] rounded-full">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-[#0F172A]">${product.price}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-[#475569]">
                          {product.createdBy}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleShowOnHome(product)}
                          disabled={loadingId === product._id}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                            product.showOnHome ? 'bg-[#0D9488]' : 'bg-gray-300'
                          } ${loadingId === product._id ? 'opacity-50' : ''}`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              product.showOnHome
                                ? 'translate-x-6'
                                : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              navigate(
                                `/dashboard/update-product/${product._id}`,
                                {
                                  state: { from: location.pathname },
                                }
                              )
                            }
                            className="p-2 text-[#0D9488] hover:bg-[#0D9488]/10 rounded-lg transition-colors"
                            title="Update Product"
                          >
                            <RiEdit2Fill className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete Product"
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
      {products?.length === 0 && (
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

export default AllProductsManage;
