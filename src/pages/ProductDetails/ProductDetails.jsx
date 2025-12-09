import { Link, useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CreditCard,
  Package,
  ShoppingCart,
  Truck,
} from 'lucide-react';
import LoadingSpinner from '../../components/LoadingSpinner';
import useAuth from '../../hooks/useAuth';

const ProductDetails = () => {
  const { user } = useAuth();
  const { productId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: DBUser = {} } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res.data;
    },
  });

  const { data: product = {}, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/product/${productId}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div>
      <div className=" bg-[#E2E8F0] py-5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-2">
          <Link
            to="/all-products"
            className="inline-flex items-center gap-2 text-[#475569] hover:text-[#0D9488] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="rounded-3xl overflow-hidden shadow-xl">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-[500px] object-cover"
                />
              </div>

              {/* Demo Video  */}
              {product.demoVideo && (
                <div className="bg-white rounded-2xl p-6">
                  <h3 className="text-[#0F172A] mb-4">Product Demo Video</h3>
                  <div className="bg-[#E2E8F0] rounded-xl h-64 flex items-center justify-center">
                    <iframe
                      className="w-full h-full rounded-xl"
                      src={product.demoVideo}
                      title="Product Demo Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="inline-block px-4 py-1 bg-[#2DD4BF]/20 text-[#0D9488] rounded-full mb-4">
                  {product.category}
                </div>

                <h1 className="text-[#0F172A] font-semibold mb-4">
                  {product.title}
                </h1>

                <p className="text-[#475569] mb-6 leading-relaxed">
                  {product.description}
                </p>

                {/* Price */}
                <div className="bg-linear-to-br from-[#0D9488] to-[#0F172A] rounded-2xl p-6 text-white mb-6">
                  <p className="text-gray-200 mb-2">Price per unit</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-white">${product.price}</span>
                    <span className="text-gray-200">USD</span>
                  </div>
                </div>

                {/* Product Info*/}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#E2E8F0] rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="w-5 h-5 text-[#0D9488]" />
                      <p className="text-[#475569]">Available</p>
                    </div>
                    <p className="text-[#0F172A]">
                      {product.availableQuantity} units
                    </p>
                  </div>

                  <div className="bg-[#E2E8F0] rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <ShoppingCart className="w-5 h-5 text-[#0D9488]" />
                      <p className="text-[#475569]">Min Order</p>
                    </div>
                    <p className="text-[#0F172A]">
                      {product.minimumOrder} units
                    </p>
                  </div>

                  <div className="bg-[#E2E8F0] rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard className="w-5 h-5 text-[#0D9488]" />
                      <p className="text-[#475569]">Payment</p>
                    </div>
                    <p className="text-[#0F172A]">{product.paymentMode}</p>
                  </div>

                  <div className="bg-[#E2E8F0] rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Truck className="w-5 h-5 text-[#0D9488]" />
                      <p className="text-[#475569]">Delivery</p>
                    </div>
                    <p className="text-[#0F172A]">10-15 days</p>
                  </div>
                </div>

                {/* Payment Options */}
                <div className="bg-[#0D9488]/10 rounded-2xl p-4 mb-6">
                  <h3 className="text-[#0F172A] mb-3">Payment Options</h3>
                  <ul className="space-y-2 text-[#475569]">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#0D9488] rounded-full"></div>
                      {product.paymentOptions}
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <Link
                    to={
                      !user ||
                      DBUser?.role === 'admin' ||
                      DBUser?.role === 'manager'
                        ? '#'
                        : `/booking-order/${product._id}`
                    }
                    className={`w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#0D9488] text-white rounded-xl hover:bg-[#0D9488]/90 transition-all shadow-lg hover:shadow-xl ${
                      !user ||
                      DBUser?.role === 'admin' ||
                      DBUser?.role === 'manager'
                        ? 'opacity-50 cursor-not-allowed pointer-events-none'
                        : 'hover:bg-[#0D9488]/90'
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Order Now
                  </Link>

                  <Link
                    to={'/all-products'}
                    className="w-full btn btn-outline py-4 border-2 border-[#0D9488] text-[#0D9488] rounded-xl hover:bg-[#0D9488]/7 transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-[#0F172A] mb-4">Product Features</h3>
                <ul className="space-y-3 text-[#475569]">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#0D9488]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-[#0D9488]"></div>
                    </div>
                    <span>
                      High-quality materials sourced from certified suppliers
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#0D9488]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-[#0D9488]"></div>
                    </div>
                    <span>
                      Rigorous quality control at every production stage
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#0D9488]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-[#0D9488]"></div>
                    </div>
                    <span>Real-time production tracking available</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#0D9488]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-[#0D9488]"></div>
                    </div>
                    <span>Customization options available for bulk orders</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
