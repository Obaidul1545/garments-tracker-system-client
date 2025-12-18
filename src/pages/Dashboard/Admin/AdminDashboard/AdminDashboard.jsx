import { motion } from 'framer-motion';
import {
  CheckCircle,
  Package,
  ShoppingCart,
  TrendingUp,
  UserCog,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { Link } from 'react-router';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminDashboard = () => {
  const [chartType, setChartType] = useState('Bar');
  const axiosSecure = useAxiosSecure();

  const { data: productsData = [], isLoading: productsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-products`);
      return res.data;
    },
  });

  const { data: orders = [], isLoading: ordersLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-orders`);
      return res.data;
    },
  });

  const { data: databaseUser = [], isLoading: userLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/manage-users`);
      return res.data;
    },
  });

  const { data: managerCount, isLoading: managersLoading } = useQuery({
    queryKey: ['manager-count'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users/manager-count');
      return res.data;
    },
  });

  const chartData = [
    { name: 'Products', value: productsData.length },
    { name: 'Orders', value: orders.length },
    { name: 'Users', value: databaseUser.length },
    { name: 'Managers', value: managerCount },
  ];

  if (productsLoading || ordersLoading || userLoading || managersLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="min-h-screen container mx-auto my-8 px-2 md:px-5">
      <div className="mb-10">
        <h1 className="text-[#0F172A] text-2xl font-semibold mb-2">
          Admin Dashboard
        </h1>
        <p className="text-[#475569]">Overview of your platform performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-10">
        <div className="bg-white shadow-md hover:shadow-xl transition-shadow rounded-lg p-5 flex items-center justify-between">
          <div>
            <h2 className="text-gray-500 font-semibold">Products</h2>
            <p className="text-2xl font-semibold">{productsData.length}</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <Package size={32} className=" text-blue-600" />
          </div>
        </div>

        <div className="bg-white shadow-md hover:shadow-xl transition-shadow rounded-lg p-5 flex items-center justify-between">
          <div>
            <h2 className="text-gray-500 font-semibold">Orders (All time)</h2>
            <p className="text-2xl font-semibold">{orders.length}</p>
          </div>
          <div className="p-3 bg-green-100 rounded-full">
            <ShoppingCart size={32} className=" text-green-600" />
          </div>
        </div>

        <div className="bg-white shadow-md hover:shadow-xl transition-shadow rounded-lg p-5 flex items-center justify-between">
          <div>
            <h2 className="text-gray-500 font-semibold">Users</h2>
            <p className="text-2xl font-semibold">{databaseUser.length}</p>
          </div>
          <div className="p-3 bg-purple-100 rounded-full">
            <Users size={32} className=" text-purple-600" />
          </div>
        </div>

        <div className="bg-white shadow-md hover:shadow-xl transition-shadow rounded-lg p-5 flex items-center justify-between">
          <div>
            <h2 className="text-gray-500 font-semibold">Managers</h2>
            <p className="text-2xl font-semibold">{managerCount}</p>
          </div>
          <div className="p-3 bg-orange-100 rounded-full">
            <UserCog size={32} className=" text-orange-600" />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">Analysis Chart</h2>
        </div>
        <div>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="Bar">Bar Chart</option>
            <option value="Line">Line Chart</option>
            <option value="Pie">Pie Chart</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4">
        <ResponsiveContainer width="100%" height={300}>
          {chartType === 'Bar' && (
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          )}
          {chartType === 'Line' && (
            <LineChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          )}
          {chartType === 'Pie' && (
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 my-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg p-6 shadow-md mt-5"
        >
          <h2 className="text-[#0F172A] text-xl mb-6">Quick Stats</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#E2E8F0] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-[#475569]">Active Users</p>
                  <p className="text-[#0F172A]">892</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#E2E8F0] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0D9488]/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-[#0D9488]" />
                </div>
                <div>
                  <p className="text-[#475569]">Completed Orders</p>
                  <p className="text-[#0F172A]">4,321</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#E2E8F0] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-[#475569]">Pending Orders</p>
                  <p className="text-[#0F172A]">234</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#E2E8F0] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-[#475569]">Growth Rate</p>
                  <p className="text-[#0F172A]">+23%</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-linear-to-br from-[#0D9488] to-[#0F172A] rounded-lg p-6 text-white shadow-md mt-5"
        >
          <h2 className="text-white text-xl mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to={'/dashboard/manage-users'}
              className="block p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              Manage All Users
            </Link>
            <Link
              to={'/dashboard/all-products-manage'}
              className="block p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              Manage All Products
            </Link>
            <Link
              to={'/dashboard/all-orders'}
              className="block p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              Manage All Orders
            </Link>
            <Link
              to={'/dashboard/profile'}
              className="block p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              My Profile
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
