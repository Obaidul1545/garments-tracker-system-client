import { motion } from 'framer-motion';
import { CheckCircle, ShoppingCart, TrendingUp, Users } from 'lucide-react';
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

const dashboardData = {
  products: { today: 12, week: 56, month: 230 },
  orders: { month: 78 },
  users: { new: 15, total: 450 },
  managers: { active: 5 },
};

const chartData = [
  { name: 'Products', value: 230 },
  { name: 'Orders', value: 78 },
  { name: 'Users', value: 450 },
  { name: 'Managers', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminDashboard = () => {
  const [filter, setFilter] = useState('Today');
  const [chartType, setChartType] = useState('Bar');

  const filteredProducts = {
    Today: dashboardData.products.today,
    Week: dashboardData.products.week,
    Month: dashboardData.products.month,
  }[filter];
  return (
    <div className="p-6 bg-gray-50 min-h-screen container mx-au">
      <div className="mb-10">
        <h1 className="text-[#0F172A] text-2xl font-semibold mb-2">
          Admin Dashboard
        </h1>
        <p className="text-[#475569]">Overview of your platform performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white shadow-md hover:shadow-xl transition-shadow rounded-lg p-4">
          <h2 className="text-gray-500">Products</h2>
          <p className="text-2xl font-semibold">{filteredProducts}</p>
        </div>
        <div className="bg-white shadow-md hover:shadow-xl transition-shadow rounded-lg p-4">
          <h2 className="text-gray-500">Orders (This Month)</h2>
          <p className="text-2xl font-semibold">{dashboardData.orders.month}</p>
        </div>
        <div className="bg-white shadow-md hover:shadow-xl transition-shadow rounded-lg p-4">
          <h2 className="text-gray-500">Users</h2>
          <p className="text-2xl font-semibold">
            {dashboardData.users.new} New / {dashboardData.users.total} Total
          </p>
        </div>
        <div className="bg-white shadow-md hover:shadow-xl transition-shadow rounded-lg p-4">
          <h2 className="text-gray-500">Managers</h2>
          <p className="text-2xl font-semibold">
            {dashboardData.managers.active} Active
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <button
            onClick={() => setFilter('Today')}
            className={`px-4 py-2 rounded mr-2 ${
              filter === 'Today'
                ? 'bg-teal-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setFilter('Week')}
            className={`px-4 py-2 rounded mr-2 ${
              filter === 'Week'
                ? 'bg-teal-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setFilter('Month')}
            className={`px-4 py-2 rounded ${
              filter === 'Month'
                ? 'bg-teal-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            30 Days
          </button>
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-lg p-6 shadow-md mt-5"
      >
        <h2 className="text-[#0F172A] mb-6">Quick Stats</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-[#E2E8F0] rounded-xl">
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

          <div className="flex items-center justify-between p-4 bg-[#E2E8F0] rounded-xl">
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

          <div className="flex items-center justify-between p-4 bg-[#E2E8F0] rounded-xl">
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

          <div className="flex items-center justify-between p-4 bg-[#E2E8F0] rounded-xl">
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
    </div>
  );
};

export default AdminDashboard;
