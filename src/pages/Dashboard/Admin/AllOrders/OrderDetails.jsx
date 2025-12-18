import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, MapPin } from 'lucide-react';

const OrderDetails = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { orderId } = useParams();

  const { data: order = {}, isLoading } = useQuery({
    queryKey: ['order-details', orderId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/order/${orderId}`);
      return res.data;
    },
  });

  const trackingId = order.trackingId;

  const { data: trackings = [] } = useQuery({
    queryKey: ['tracking', trackingId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tracking/${trackingId}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      <div className="container mx-auto px-4">
        <div className="mt-3">
          <span
            onClick={() => navigate(-1)}
            className="inline-flex gap-1 items-center cursor-pointer hover:text-teal-600"
          >
            <ArrowLeft size={20} /> Back
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto bg-white rounded-md shadow-md p-6 my-4"
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-teal-800">
              Order Details
            </h1>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-700'
                  : order.status === 'Approved'
                  ? 'bg-blue-100 text-blue-700'
                  : order.status === 'Delivered'
                  ? 'bg-green-100 text-green-700'
                  : order.status === 'Cancelled'
                  ? 'bg-red-100 text-red-700'
                  : order.status === 'Rejected'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {order.status}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
            <div>
              <p className="font-semibold">Order ID</p>
              <p>{order.orderId}</p>
            </div>

            <div>
              <p className="font-semibold">Tracking ID</p>
              <p>{order.trackingId}</p>
            </div>

            <div>
              <p className="font-semibold">Order Date</p>
              <p>{new Date(order.createdAt).toLocaleDateString('en-GB')}</p>
            </div>

            {order.approvedAt && (
              <div>
                <p className="font-semibold">Approved At</p>
                <p>{new Date(order.approvedAt).toLocaleDateString('en-GB')}</p>
              </div>
            )}
          </div>

          <hr className="my-6" />

          <div className="mb-6">
            <h3 className="font-semibold text-teal-700 mb-2">
              Customer Information
            </h3>
            <div className="text-sm space-y-1">
              <p>
                <span className="font-semibold">Name:</span> {order.firstName}{' '}
                {order.lastName}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {order.email}
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{' '}
                {order.contactNumber}
              </p>
              <p>
                <span className="font-semibold">Address:</span>{' '}
                {order.deliveryAddress}
              </p>
            </div>
          </div>

          <hr className="my-6" />

          <div>
            <h3 className="font-semibold text-teal-700 mb-2">
              Product Information
            </h3>
            <div className="text-sm space-y-1">
              <p>
                <span className="font-semibold">Product:</span>{' '}
                {order.productTitle}
              </p>
              <p>
                <span className="font-semibold">Quantity:</span>{' '}
                {order.quantity} units
              </p>
              <p>
                <span className="font-semibold">Total Price:</span>{' '}
                <span className="text-emerald-600 font-semibold">
                  ${order.totalPrice.toFixed(2)}
                </span>
              </p>
            </div>
          </div>

          <hr className="my-6" />

          <h1 className="text-2xl font-semibold text-teal-800">
            Order Tracking
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto px-4 my-5"
          >
            <div className="">
              <ul className="timeline timeline-vertical">
                {trackings.map((item, index) => {
                  const isLatest = index === trackings.length - 1;
                  return (
                    <li key={item._id} className={``}>
                      {index !== 0 && <hr className="bg-[#0D9488]" />}

                      <div className="timeline-start text-sm text-slate-500">
                        {new Date(item.createdAt).toLocaleDateString('en-GB')}
                      </div>

                      <div className="timeline-middle">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                          className="w-6 h-6 rounded-full bg-[#0D9488] flex items-center justify-center shadow-md"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="white"
                            className="h-4 w-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`timeline-end timeline-box p-4 border-l-4 rounded-md ${
                          isLatest
                            ? 'border-teal-600 bg-teal-50'
                            : 'border-gray-300 bg-white'
                        }`}
                      >
                        <h3 className="font-semibold text-[#0F172A]">
                          {item.details}
                        </h3>

                        {item.location && (
                          <p className="text-sm inline-flex gap-1 text-slate-600 mt-1">
                            <MapPin size={20} /> {item.location}
                          </p>
                        )}

                        {item.note && (
                          <p className="text-sm text-slate-500 mt-1">
                            📝 {item.note}
                          </p>
                        )}

                        <p className="text-xs text-slate-400 mt-2">
                          {new Date(item.createdAt).toLocaleTimeString()}
                        </p>
                      </motion.div>
                      {index !== trackings.length - 1 && (
                        <hr className="bg-[#0D9488]" />
                      )}
                    </li>
                  );
                })}
              </ul>

              {trackings.length === 0 && (
                <p className="text-center text-slate-500 py-10">
                  No tracking updates yet
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderDetails;
