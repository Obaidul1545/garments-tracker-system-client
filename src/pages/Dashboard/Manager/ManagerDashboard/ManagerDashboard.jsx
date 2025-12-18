import { CheckCircle, Clock, Package, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../../components/LoadingSpinner';

const ManagerDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products-by-email`);
      return res.data;
    },
  });

  const { data: pendingOrders = [], isLoading: ordersLoading } = useQuery({
    queryKey: ['pendingOrders'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/pending`);
      return res.data;
    },
  });

  const { data: approvedOrders = [], isLoading: approvedLoading } = useQuery({
    queryKey: ['approvedOrders'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/approved`);
      return res.data;
    },
  });

  const stats = [
    {
      icon: Package,
      label: 'My Products',
      value: products.length,
      color: 'from-[#0D9488] to-[#2DD4BF]',
    },
    {
      icon: ShoppingCart,
      label: 'Total Orders',
      value: '128',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Clock,
      label: 'Pending Approval',
      value: pendingOrders.length,
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      icon: CheckCircle,
      label: 'Completed',
      value: approvedOrders.length,
      color: 'from-green-500 to-green-600',
    },
  ];

  if (productsLoading || ordersLoading || approvedLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <div className="space-y-8 min-h-screen container mx-auto my-8 px-2 md:px-5">
        <div>
          <h1 className="text-[#0F172A] text-2xl font-semibold mb-2">
            Manager Dashboard
          </h1>
          <p className="text-[#475569]">Manage your products and orders</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center mb-4`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-[#0F172A] mb-1">{stat.value}</div>
                <p className="text-[#475569]">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-md"
          >
            <h2 className="text-[#0F172A] mb-6">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-[#E2E8F0] rounded-xl">
                <div className="w-10 h-10 bg-[#0D9488] rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-[#0F172A]">New product added</p>
                  <p className="text-[#475569]">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-[#E2E8F0] rounded-xl">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-[#0F172A]">Order approved</p>
                  <p className="text-[#475569]">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-[#E2E8F0] rounded-xl">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-[#0F172A]">Order completed</p>
                  <p className="text-[#475569]">1 day ago</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-linear-to-br from-[#0D9488] to-[#0F172A] rounded-2xl p-6 text-white shadow-md"
          >
            <h2 className="text-white mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to={'/dashboard/add-product'}
                className="block p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
              >
                Add New Product
              </Link>
              <Link
                to={'/dashboard/manage-products'}
                className="block p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
              >
                Manage Products
              </Link>
              <Link
                to={'/dashboard/pending-orders'}
                className="block p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
              >
                Review Pending Orders
              </Link>
              <Link
                to={'/dashboard/manage-products'}
                className="block p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
              >
                Approved Orders
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
