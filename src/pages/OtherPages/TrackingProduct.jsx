import { motion } from 'framer-motion';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { MapPin } from 'lucide-react';

const TrackingProduct = () => {
  const axiosSecure = useAxiosSecure();
  const { trackingId } = useParams();

  const { data: trackings = [], isLoading } = useQuery({
    queryKey: ['tracking', trackingId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tracking/${trackingId}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-4 my-5"
      >
        <div className="">
          <h1 className="text-3xl font-semibold text-[#0F172A]">
            Order Tracking
          </h1>
          <p className="text-slate-500 mt-1">
            Track production & delivery progress
          </p>
        </div>

        <div className="bg-white rounded-md shadow-md p-6 mt-3">
          <ul className="timeline timeline-vertical">
            {trackings.map((item, index) => (
              <li key={item._id}>
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
                  className="timeline-end timeline-box bg-slate-50 border border-slate-200 rounded-xl"
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
            ))}
          </ul>

          {trackings.length === 0 && (
            <p className="text-center text-slate-500 py-10">
              No tracking updates yet
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default TrackingProduct;
