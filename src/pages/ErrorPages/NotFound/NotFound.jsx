import React from 'react';
import { FaArrowLeft, FaHome } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-linear-to-br from-[#0D9488] to-[#0F172A] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <div className="text-white mb-4 text-9xl">404</div>
          <h1 className="text-white mb-4">Page Not Found</h1>
          <p className="text-gray-200 mb-8">
            Oops! The page you&apos;re looking for doesn&apos;t exist. It might
            have been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#0D9488] rounded-2xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
          >
            <FaHome className="w-5 h-5" />
            Go to Homepage
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-2xl hover:bg-white hover:text-[#0D9488] transition-all cursor-pointer"
          >
            <FaArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* <div className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto">
          <Link
            to="/"
            className="p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-white"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-white"
          >
            Products
          </Link>
          <Link
            to="/login"
            className="p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-white"
          >
            Login
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default NotFound;
