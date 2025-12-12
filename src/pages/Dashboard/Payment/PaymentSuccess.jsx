import { CheckCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get('session_id');
  const axiosSecure = useAxiosSecure();

  const { data: paymentInfo = {} } = useQuery({
    queryKey: ['paymentInfo', sessionId],
    queryFn: async () => {
      const res = await axiosSecure.patch(
        `/payment-success?session_id=${sessionId}`
      );
      return res.data;
    },
  });

  return (
    <div className="my-10 bg-[#E2E8F0] flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full text-center space-y-6">
        <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
        <h1 className="text-2xl font-bold text-[#0F172A]">
          Payment Successful!
        </h1>
        <p className="text-gray-600">
          Thank you for your purchase. Your payment has been completed
          successfully.
        </p>

        {sessionId && (
          <p className="text-sm text-gray-500 break-all">
            Transaction ID:{' '}
            <span className="font-mono text-gray-700">
              {paymentInfo.transactionId}
            </span>
          </p>
        )}

        <button
          onClick={() => navigate('/dashboard/my-orders')}
          className="mt-4 w-full px-6 py-3 bg-[#0D9488] hover:bg-[#0D9488]/90 text-white font-medium rounded-lg transition-colors shadow-md cursor-pointer"
        >
          Go to My Orders
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
