import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useAxios from '../../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { Eye, Search } from 'lucide-react';
import LoadingSpinner from '../../../../components/LoadingSpinner';

const AllOrders = () => {
  const [search, setSearch] = useState('');
  const [sortByStatus, setSortByStatus] = useState('all');
  const axiosInstance = useAxios();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['products', search],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/all-orders?search=${search}&sortBy=${sortByStatus}`
      );
      return res.data;
    },
  });
  return (
    <div>
      <div className="space-y-6 px-4 sm:px-6 lg:px-8 py-5">
        <div>
          <h1 className="text-[#0F172A] text-3xl font-semibold mb-2">
            All Orders
          </h1>
          <p className="text-[#475569]">
            Monitor and manage all platform orders
          </p>
        </div>

        <div className="bg-white rounded-md p-6 shadow-md">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#475569]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search orders..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0D9488] focus:border-transparent outline-none transition-all"
              />
            </div>
            <select
              value={sortByStatus}
              onChange={(e) => setSortByStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0D9488] focus:border-transparent outline-none transition-all"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="sewing">In Production</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
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
                    <th className="px-2 py-4 text-left text-[#0F172A]">
                      Order ID
                    </th>
                    <th className="px-6 py-4 text-left text-[#0F172A]">User</th>
                    <th className="px-6 py-4 text-left text-[#0F172A]">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-[#0F172A]">
                      Quantity
                    </th>
                    <th className="px-6 py-4 text-left text-[#0F172A]">
                      Total
                    </th>
                    <th className="px-6 py-4 text-left text-[#0F172A]">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-[#0F172A]">Date</th>
                    <th className="px-6 py-4 text-left text-[#0F172A]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((order, index) => (
                    <motion.tr
                      key={order._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <div className="text-[#0F172A]">{order.orderId}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-[#0F172A]">
                          {order.firstName} {order.lastName}
                        </div>
                        <div className="text-[#475569] text-sm">
                          {order.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-[#0F172A]">
                          {order.productTitle}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-[#475569]">
                          {order.quantity} units
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-[#0D9488]">
                          ${order.totalPrice}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full ${
                            order.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : order.status === 'approved'
                              ? 'bg-blue-100 text-blue-700'
                              : order.status === 'sewing'
                              ? 'bg-indigo-100 text-indigo-700'
                              : order.status === 'delivered'
                              ? 'bg-green-100 text-green-700'
                              : order.status === 'cancelled'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-[#475569]">
                          {new Date(order.createdAt).toLocaleDateString(
                            'en-GB'
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-2 text-[#0D9488] hover:bg-[#0D9488]/10 rounded-lg transition-colors">
                          <Eye className="w-5 h-5" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {orders.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[#475569]">No orders found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOrders;
