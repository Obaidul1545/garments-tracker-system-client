import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';

const PaymentCancelled = () => {
  const navigate = useNavigate();
  return (
    <div className="my-10 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center"
      >
        <XCircle className="mx-auto w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Payment Cancelled
        </h1>
        <p className="text-gray-500 mb-6">
          Your payment was not completed. You can try again.
        </p>
        <button
          onClick={() => navigate('/all-products')}
          className="w-full px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors shadow-md"
        >
          Go Back to All Products
        </button>
      </motion.div>
    </div>
  );
};

export default PaymentCancelled;
