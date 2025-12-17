import AdminDashboard from '../Admin/AdminDashboard/AdminDashboard';
import useRole from '../../../hooks/useRole';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ManagerDashboard from '../Manager/ManagerDashboard/ManagerDashboard';
import BuyerDashboard from '../Buyer/BuyerDashboard/BuyerDashboard';

const DashboardHome = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) return <LoadingSpinner />;

  if (role === 'admin') return <AdminDashboard />;
  if (role === 'manager') return <ManagerDashboard />;
  if (role === 'buyer') return <BuyerDashboard />;
};

export default DashboardHome;
