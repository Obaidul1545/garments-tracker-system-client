import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { MapPinPlus, Route, Search } from 'lucide-react';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet';

const ApprovedOrders = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');
  const [note, setNote] = useState('');
  const trackingModalRef = useRef();

  const {
    data: approvedOrders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['approvedOrders'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/approved`);
      return res.data;
    },
  });

  const handleAddTracking = async () => {
    trackingModalRef.current.close();
    Swal.fire({
      title: 'Tracking Add this order?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0D9488',
      customClass: {
        popup: 'z-[9999]',
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.post('/add-tracking', {
            trackingId: selectedOrder.trackingId,
            status,
            location,
            note,
          });
          Swal.fire('Success', 'Tracking updated', 'success');
          refetch();
        } catch (error) {
          if (error.response?.status === 409) {
            Swal.fire({
              icon: 'error',
              title: 'Duplicate!',
              text:
                error.response.data.message ||
                'This tracking step already exists.',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Failed to add tracking',
            });
          }
        }
      }
    });
  };

  const openAddTrackingModal = (order) => {
    setSelectedOrder(order);
    trackingModalRef.current.showModal();
  };
  return (
    <div className="container mx-auto">
      <Helmet>
        <title>Approved Orders - Garments Tracker</title>
      </Helmet>
      <div className="space-y-6 px-3 sm:px-4 lg:px-4 py-5">
        <div>
          <h1 className="text-[#0F172A] text-3xl font-semibold mb-2">
            Approved Orders
          </h1>
          <p className="text-[#475569]">
            Track approved orders and proceed to the next production stage
          </p>
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
                      Approved Date
                    </th>
                    <th className="px-6 py-4 text-left text-[#0F172A]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {approvedOrders.map((order, index) => (
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
                          {new Date(order.approvedAt).toLocaleDateString(
                            'en-GB'
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 flex flex-col gap-1  ">
                        <button
                          onClick={() => openAddTrackingModal(order)}
                          className="btn btn-sm bg-[#0D9488] text-white hover:bg-[#0D9488]/90 items-center  justify-center gap-2 cursor-pointer"
                        >
                          <MapPinPlus className="w-5 h-5" />
                          Add Tracking
                        </button>
                        <Link
                          to={`/dashboard/product-track/${order.trackingId}`}
                          className="btn btn-sm bg-[#0D9488] text-white hover:bg-[#0D9488]/90 items-center  justify-center gap-2 cursor-pointer inline-flex whitespace-nowrap"
                        >
                          <Route className="w-5 h-5" />
                          View Tracking
                        </Link>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {approvedOrders.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[#475569]">
                  No pending orders at the moment
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <dialog ref={trackingModalRef} className="modal">
        <div className="modal-box">
          <h3 className="text-lg text-[#0D9488] font-semibold mb-3">
            Add Tracking Update
          </h3>

          <select
            className="select select-bordered w-full mb-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="Cutting_Completed">Cutting Completed</option>
            <option value="Sewing_Started">Sewing Started</option>
            <option value="Finishing">Finishing</option>
            <option value="QC_Checked">QC Checked</option>
            <option value="Packed">Packed</option>
            <option value="Shipped">Shipped</option>
            <option value="Out_For_Delivery">Out For Delivery</option>
          </select>

          <input
            type="text"
            placeholder="Location"
            className="input input-bordered w-full mb-2"
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <textarea
            placeholder="Note"
            className="textarea textarea-bordered w-full"
            onChange={(e) => setNote(e.target.value)}
            required
          />

          <div className="flex items-center justify-between">
            <button
              className="btn bg-[#0D9488] text-white mt-6"
              onClick={handleAddTracking}
            >
              Save
            </button>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn bg-[#EF4444] text-white">Close</button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ApprovedOrders;
