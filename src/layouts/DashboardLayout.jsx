import { Link, NavLink, Outlet } from 'react-router';
import useRole from '../hooks/useRole';
import {
  CirclePlus,
  Home,
  PanelRightOpen,
  ShoppingCart,
  SquareChartGantt,
  User,
} from 'lucide-react';
import { FaCheckCircle, FaListAlt, FaUsers } from 'react-icons/fa';
import { TbLayoutGridFilled } from 'react-icons/tb';
import { RiDashboardHorizontalFill } from 'react-icons/ri';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MdPendingActions } from 'react-icons/md';

const DashboardLayout = () => {
  const { role } = useRole();

  const navItemClass = (isActive) =>
    `flex items-center gap-3 p-2 rounded-md shadow-sm transition-all is-drawer-close:tooltip is-drawer-close:tooltip-right 
  ${
    isActive ? 'bg-[#0D9488] text-white ' : 'text-gray-300 hover:bg-[#1E293B]'
  }`;

  return (
    <div className=" bg-[#E2E8F0]">
      <header className="sticky top-0 z-50">
        <Navbar></Navbar>
      </header>
      <div className="drawer lg:drawer-open bg-[#E2E8F0]">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

        {/* main content */}
        <div className="drawer-content">
          <nav className="navbar w-full bg-[#0F172A] text-white">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost text-white"
            >
              <PanelRightOpen size={24} />
            </label>
            <div className="px-4 text-lg font-semibold">Dashboard</div>
          </nav>

          <Outlet />
        </div>

        {/* side navbar */}
        <div className="drawer-side is-drawer-close:overflow-visible">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
          <div className="flex min-h-full flex-col bg-[#0F172A] text-white is-drawer-close:w-20 is-drawer-open:w-64">
            <ul className="menu w-full grow p-3 space-y-4">
              <li>
                <Link to={'/'} className="text-gray-200">
                  <RiDashboardHorizontalFill size={26} />
                  <span className="is-drawer-close:hidden text-2xl font-semibold">
                    Garments
                  </span>
                </Link>
              </li>

              {/* home page */}
              <li className="mt-4">
                <NavLink
                  to={'/dashboard'}
                  end
                  className={({ isActive }) => navItemClass(isActive)}
                  data-tip="Home"
                >
                  <Home size={20} />
                  <span className="is-drawer-close:hidden">Home</span>
                </NavLink>
              </li>

              {/* buyer links*/}
              {role === 'buyer' && (
                <>
                  <li>
                    <NavLink
                      to={'/dashboard/my-orders'}
                      className={({ isActive }) => navItemClass(isActive)}
                      data-tip="My Orders"
                    >
                      <ShoppingCart size={20} />
                      <span className="is-drawer-close:hidden">My Orders</span>
                    </NavLink>
                  </li>
                </>
              )}

              {/* manager Links */}
              {role === 'manager' && (
                <>
                  <li>
                    <NavLink
                      to={'/dashboard/add-product'}
                      className={({ isActive }) => `${navItemClass(isActive)}`}
                      data-tip="Add Product"
                    >
                      <CirclePlus size={20} />
                      <span className="is-drawer-close:hidden">
                        Add Product
                      </span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to={'/dashboard/manage-products'}
                      className={({ isActive }) => `${navItemClass(isActive)}`}
                      data-tip="Manage Products"
                    >
                      <SquareChartGantt size={20} />
                      <span className="is-drawer-close:hidden">
                        Manage Products
                      </span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to={'/dashboard/pending-orders'}
                      className={({ isActive }) => `${navItemClass(isActive)}`}
                      data-tip="Pending Orders"
                    >
                      <MdPendingActions size={20} />
                      <span className="is-drawer-close:hidden">
                        Pending Orders
                      </span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to={'/dashboard/approved-orders'}
                      className={({ isActive }) => `${navItemClass(isActive)}`}
                      data-tip="Approved Orders"
                    >
                      <FaCheckCircle size={20} />
                      <span className="is-drawer-close:hidden">
                        Approved Orders
                      </span>
                    </NavLink>
                  </li>
                </>
              )}

              {/* Admin Links */}
              {role === 'admin' && (
                <>
                  <li>
                    <NavLink
                      to={'/dashboard/manage-users'}
                      className={({ isActive }) => `${navItemClass(isActive)}`}
                      data-tip="Manage Users"
                    >
                      <FaUsers size={20} />
                      <span className="is-drawer-close:hidden">
                        Manage Users
                      </span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to={'/dashboard/all-products-manage'}
                      className={({ isActive }) => `${navItemClass(isActive)}`}
                      data-tip="All Products"
                    >
                      <TbLayoutGridFilled size={20} />
                      <span className="is-drawer-close:hidden">
                        All Products
                      </span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to={'/dashboard/all-orders'}
                      className={({ isActive }) => `${navItemClass(isActive)}`}
                      data-tip="All Orders"
                    >
                      <FaListAlt size={18} />
                      <span className="is-drawer-close:hidden">All Orders</span>
                    </NavLink>
                  </li>
                </>
              )}

              {/* my profile */}
              <li>
                <NavLink
                  to={'/dashboard/profile'}
                  className={({ isActive }) => navItemClass(isActive)}
                  data-tip="My profile"
                >
                  <User size={20} />
                  <span className="is-drawer-close:hidden">My profile</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default DashboardLayout;
