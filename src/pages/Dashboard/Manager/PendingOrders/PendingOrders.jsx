import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useAxios from '../../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { CheckCircle, Eye, Search, XCircle } from 'lucide-react';
import LoadingSpinner from '../../../../components/LoadingSpinner';

const PendingOrders = () => {
  const axiosSecure = useAxios();

  const { data: pendingOrders = [], isLoading } = useQuery({
    queryKey: ['pendingOrders'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/pending`);
      return res.data;
    },
  });
  return (
    <div className="container mx-auto">
      <div className="space-y-6 px-3 sm:px-4 lg:px-4 py-5">
        <div>
          <h1 className="text-[#0F172A] text-3xl font-semibold mb-2">
            Pending Orders
          </h1>
          <p className="text-[#475569]">Review and approve customer orders</p>
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
                      Order Date
                    </th>
                    <th className="px-6 py-4 text-left text-[#0F172A]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {pendingOrders.map((order, index) => (
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
                        <div className="text-[#475569]">
                          {new Date(order.createdAt).toLocaleDateString(
                            'en-GB'
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button title="Approve Order">
                            <CheckCircle className="w-5 h-5 text-green-600 cursor-pointer" />
                          </button>
                          <button title="Reject Order">
                            <XCircle className="w-5 h-5 text-red-600 cursor-pointer" />
                          </button>
                          <button title="View Order">
                            <Eye className="w-5 h-5 text-blue-600 cursor-pointer" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {pendingOrders.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[#475569]">
                  No pending orders at the moment
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingOrders;
