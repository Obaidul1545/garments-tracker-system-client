import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E2E8F0]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-[#0D9488]/20 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-[#0D9488] border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
