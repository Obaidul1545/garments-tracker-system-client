import { motion } from 'framer-motion';
import { CheckCircle, Clock, Link, Package, ShoppingCart } from 'lucide-react';

const BuyerDashboard = () => {
  // const myOrders = mockOrders?.slice(0, 3);

  const stats = [
    {
      icon: ShoppingCart,
      label: 'Total Orders',
      value: '15',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Package,
      label: 'In Production',
      value: '5',
      color: 'from-[#0D9488] to-[#2DD4BF]',
    },
    {
      icon: Clock,
      label: 'Pending',
      value: '2',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      icon: CheckCircle,
      label: 'Delivered',
      value: '8',
      color: 'from-green-500 to-green-600',
    },
  ];

  // const getStatusColor = (status: string) => {
  //   const colors: { [key: string]: string } = {
  //     pending: 'bg-yellow-100 text-yellow-700',
  //     sewing: 'bg-blue-100 text-blue-700',
  //     delivered: 'bg-green-100 text-green-700',
  //   };
  //   return colors[status] || 'bg-gray-100 text-gray-700';
  // };
  return (
    <div>
      <div className="space-y-8 container mx-auto">
        <div className="mb-10 mt-5">
          <h1 className="text-[#0F172A] text-2xl font-semibold mb-2">
            My Dashboard
          </h1>
          <p className="text-[#475569]">
            Track your orders and manage your account
          </p>
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
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[#0F172A]">Recent Orders</h2>
              <Link
                to="/dashboard/buyer/orders"
                className="text-[#0D9488] hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {/* {myOrders?.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 bg-[#E2E8F0] rounded-xl"
                >
                  <div className="flex-1">
                    <p className="text-[#0F172A] mb-1">{order.id}</p>
                    <p className="text-[#475569]">{order.productTitle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#0D9488] mb-1">${order.totalPrice}</p>
                    <span
                    // className={`px-3 py-1 rounded-full ${getStatusColor(
                    //   order.status
                    // )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))} */}
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
                to="/products"
                className="block p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
              >
                Browse Products
              </Link>
              <Link
                to="/dashboard/buyer/orders"
                className="block p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
              >
                View All Orders
              </Link>
              <Link
                to="/profile"
                className="block p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
              >
                Edit Profile
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
