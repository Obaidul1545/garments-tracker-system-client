import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Eye, Route, Search } from 'lucide-react';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { MdCancel } from 'react-icons/md';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyOrders = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [sortByStatus, setSortByStatus] = useState('all');
  const axiosSecure = useAxiosSecure();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const orderModalRef = useRef();

  const {
    data: myOrders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['myOrders', user.email, search, sortByStatus],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/orders-by-email?email=${user.email}&search=${search}&sortBy=${sortByStatus}`
      );
      return res.data;
    },
  });

  const openDetailsModal = (order) => {
    setSelectedOrder(order);
    orderModalRef.current.showModal();
  };

  const handleCancelOrder = async (order) => {
    Swal.fire({
      title: 'Cancel this order?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DC2626',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/orders/cancel/${order._id}`);

          Swal.fire('Cancelled!', 'Your order has been cancelled.', 'success');
          refetch();
        } catch (error) {
          Swal.fire('Error', 'Failed to cancel order', 'error');
        }
      }
    });
  };

  return (
    <div className="container mx-auto">
      <div>
        <div className="space-y-6 px-4 sm:px-4 lg:px-4 py-5">
          <div>
            <h1 className="text-[#0F172A] text-3xl font-semibold mb-2">
              My Orders
            </h1>
            <p className="text-[#475569]">View and track all your orders</p>
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
              <div className=" ">
                <select
                  value={sortByStatus}
                  onChange={(e) => setSortByStatus(e.target.value)}
                  className="w-full px-4 py-3  border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0D9488] focus:border-transparent outline-none transition-all"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Cutting_Completed">Cutting Completed</option>
                  <option value="Sewing_Started">Sewing Started</option>
                  <option value="Finishing">Finishing</option>
                  <option value="QC_Checked">QC Checked</option>
                  <option value="Packed">Packed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out_For_Delivery">Out For Delivery</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
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
                      <th className="px-6 py-4 text-left text-[#0F172A]">
                        Product
                      </th>
                      <th className="px-6 py-4 text-left text-[#0F172A]">
                        Quantity
                      </th>
                      <th className="px-6 py-4 text-left text-[#0F172A]">
                        total
                      </th>
                      <th className="px-6 py-4 text-left text-[#0F172A]">
                        Payment
                      </th>
                      <th className="px-6 py-4 text-left text-[#0F172A]">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-[#0F172A]">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-[#0F172A]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {myOrders.map((order, index) => (
                      <motion.tr
                        key={order._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4">
                          <div className="text-[#0F172A]">{order?.orderId}</div>
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
                            ${order.totalPrice.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-[#0D9488]">
                            {order.paymentStatus
                              ? order.paymentStatus
                              : 'Cash on delivery'}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full inline-flex whitespace-nowrap ${
                              order.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-700'
                                : order.status === 'Approved'
                                ? 'bg-blue-100 text-blue-700'
                                : order.status === 'Cutting_Completed'
                                ? 'bg-orange-100 text-orange-700'
                                : order.status === 'Sewing_Started'
                                ? 'bg-indigo-100 text-indigo-700'
                                : order.status === 'Finishing'
                                ? 'bg-purple-100 text-purple-700'
                                : order.status === 'QC_Checked'
                                ? 'bg-yellow-100 text-yellow-700'
                                : order.status === 'Packed'
                                ? 'bg-blue-100 text-blue-700'
                                : order.status === 'Shipped'
                                ? 'bg-cyan-100 text-cyan-700'
                                : order.status === 'Out_For_Delivery'
                                ? 'bg-green-100 text-green-700'
                                : order.status === 'Cancelled'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {order.status.split('_').join(' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-[#475569]">
                            {new Date(order.createdAt).toLocaleDateString(
                              'en-GB'
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 flex gap-1">
                          <button
                            onClick={() => openDetailsModal(order)}
                            className="p-2 text-[#0D9488] hover:bg-[#0D9488]/10 rounded-lg transition-colors cursor-pointer"
                            title="View Tracking "
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          {order.status === 'pending' && (
                            <button
                              onClick={() => handleCancelOrder(order)}
                              className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                              title="Cancel Order"
                            >
                              <MdCancel className="w-5 h-5" />
                            </button>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {myOrders.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-[#475569]">No orders found</p>
                </div>
              )}
            </div>
          )}
        </div>

        <dialog
          ref={orderModalRef}
          className="modal modal-bottom sm:modal-middle"
        >
          {selectedOrder && (
            <div className="modal-box max-w-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-teal-800">
                  Order Details
                </h2>

                <span
                  className={`px-3 py-1 rounded-full inline-flex whitespace-nowrap ${
                    selectedOrder.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : selectedOrder.status === 'Approved'
                      ? 'bg-blue-100 text-blue-700'
                      : selectedOrder.status === 'Cutting_Completed'
                      ? 'bg-orange-100 text-orange-700'
                      : selectedOrder.status === 'Sewing_Started'
                      ? 'bg-indigo-100 text-indigo-700'
                      : selectedOrder.status === 'Finishing'
                      ? 'bg-purple-100 text-purple-700'
                      : selectedOrder.status === 'QC_Checked'
                      ? 'bg-yellow-100 text-yellow-700'
                      : selectedOrder.status === 'Packed'
                      ? 'bg-blue-100 text-blue-700'
                      : selectedOrder.status === 'Shipped'
                      ? 'bg-cyan-100 text-cyan-700'
                      : selectedOrder.status === 'Out_For_Delivery'
                      ? 'bg-green-100 text-green-700'
                      : selectedOrder.status === 'Cancelled'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {selectedOrder.status.split('_').join(' ')}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <p className="font-semibold">Order ID</p>
                  <p className="font-medium">{selectedOrder.orderId}</p>
                </div>
                <div>
                  <p className="font-semibold">Tracking ID</p>
                  <p className="font-medium">{selectedOrder.trackingId}</p>
                </div>
                <div>
                  <p className="font-semibold">Order Date</p>
                  <p className="font-medium">
                    {new Date(selectedOrder.createdAt).toLocaleDateString(
                      'en-GB'
                    )}
                  </p>
                </div>
                {selectedOrder.approvedAt && (
                  <div>
                    <p className="font-semibold">Approved At</p>
                    <p className="font-medium">
                      {new Date(selectedOrder.approvedAt).toLocaleDateString(
                        'en-GB'
                      )}
                    </p>
                  </div>
                )}
              </div>

              <div className="mx-auto text-center my-8">
                <Link
                  to={`/dashboard/product-track/${selectedOrder.trackingId}`}
                  className="btn btn-sm bg-[#0D9488] text-white hover:bg-[#0D9488]/90 items-center  justify-center gap-2 cursor-pointer"
                >
                  <Route className="w-5 h-5" />
                  View Tracking
                </Link>
              </div>

              <hr className="my-4 text-gray-500" />

              <div className="mb-4">
                <h3 className="font-semibold text-teal-700 mb-2">
                  Customer Information
                </h3>
                <div className="text-sm space-y-1">
                  <p>
                    <span className="font-semibold">Name:</span>{' '}
                    {selectedOrder.firstName} {selectedOrder.lastName}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span>{' '}
                    {selectedOrder.email}
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span>{' '}
                    {selectedOrder.contactNumber}
                  </p>
                  <p>
                    <span className="font-semibold">Address:</span>{' '}
                    {selectedOrder.deliveryAddress}
                  </p>
                </div>
              </div>

              <hr className="my-4 text-gray-500" />

              <div className="mb-4">
                <h3 className="font-semibold text-teal-700 mb-2">
                  Product Information
                </h3>
                <div className="text-sm space-y-1">
                  <p>
                    <span className="font-semibold">Product:</span>{' '}
                    {selectedOrder.productTitle}
                  </p>
                  <p>
                    <span className="font-semibold">Quantity:</span>{' '}
                    {selectedOrder.quantity} units
                  </p>
                  <p>
                    <span className="font-semibold">Total Price:</span>{' '}
                    <span className="text-emerald-600 font-semibold">
                      ${selectedOrder.totalPrice.toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>

              <div className="modal-action">
                <form method="dialog">
                  <button className="btn bg-[#EF4444] text-white">Close</button>
                </form>
              </div>
            </div>
          )}
        </dialog>
      </div>
    </div>
  );
};

export default MyOrders;
