import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { CheckCircle, Eye, XCircle } from 'lucide-react';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useRef, useState } from 'react';

const PendingOrders = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const orderModalRef = useRef();

  const {
    data: pendingOrders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['pendingOrders'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/pending`);
      return res.data;
    },
  });

  const handleApproved = async (id) => {
    Swal.fire({
      title: 'Approve this order?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0D9488',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.patch(`/orders/${id}/approved`);
        Swal.fire('Approved!', 'Order approved successfully.', 'success');
        refetch();
      }
    });
  };

  const handleReject = async (id) => {
    Swal.fire({
      title: 'Reject this order?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.patch(`/orders/${id}/reject`);
        Swal.fire('Rejected!', 'Order rejected.', 'success');
        refetch();
      }
    });
  };

  const openDetailsModal = (order) => {
    setSelectedOrder(order);
    orderModalRef.current.showModal();
  };

  console.log(selectedOrder);

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
                          ${order.totalPrice.toFixed(2)}
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
                          <button
                            onClick={() => handleApproved(order._id)}
                            title="Approve Order"
                          >
                            <CheckCircle className="w-5 h-5 text-green-600 cursor-pointer" />
                          </button>
                          <button
                            onClick={() => handleReject(order._id)}
                            title="Reject Order"
                          >
                            <XCircle className="w-5 h-5 text-red-600 cursor-pointer" />
                          </button>
                          <button
                            onClick={() => openDetailsModal(order)}
                            title="View Order"
                          >
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
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700">
                {selectedOrder.status}
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
  );
};

export default PendingOrders;
