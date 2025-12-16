import React, { useEffect, useState } from 'react';
import { MdLogout } from 'react-icons/md';
import { Link, NavLink } from 'react-router';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from './LoadingSpinner';
import { BiUser } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const { user, loading, logOutUser } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const html = document.querySelector('html');
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? 'dark' : 'light');
  };

  const handleLogout = () => {
    logOutUser()
      .then(() => {
        toast.success('logout successfully!');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const links = (
    <>
      <NavLink
        to="/"
        className="text-[#475569] hover:text-[#0D9488] transition-colors"
      >
        Home
      </NavLink>
      <NavLink
        to="/all-products"
        className="text-[#475569] hover:text-[#0D9488] transition-colors"
      >
        All Products
      </NavLink>

      {user ? (
        <>
          <NavLink
            to="/dashboard"
            className="text-[#475569] hover:text-[#0D9488] transition-colors"
          >
            Dashboard
          </NavLink>
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="flex items-center gap-2">
                <img
                  src={
                    user.photoURL ||
                    'https://i.ibb.co.com/sdGfkZS4/dummy-user.png'
                  }
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-[#0D9488]"
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu  menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <div className=" pb-3 border-b border-b-gray-200">
                <li className="text-sm font-bold">{user.displayName}</li>
                <li className="text-xs">{user.email}</li>
              </div>

              <Link
                to="/dashboard/profile"
                className="text-[#475569] hover:text-[#0D9488] transition-colors inline-flex gap-1 my-2"
              >
                <BiUser size={18} /> Profile
              </Link>
              <input
                onChange={(e) => handleTheme(e.target.checked)}
                type="checkbox"
                defaultChecked={localStorage.getItem('theme') === 'dark'}
                className="toggle mb-3"
              />
            </ul>
          </div>
          <div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-[#0D9488] text-white rounded-md hover:bg-[#0D9488]/90 transition-colors cursor-pointer"
            >
              <MdLogout size={16} />
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <NavLink
            to="/about-us"
            className="text-[#475569] hover:text-[#0D9488] transition-colors"
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact"
            className="text-[#475569] hover:text-[#0D9488] transition-colors"
          >
            Contact
          </NavLink>
          <Link
            to="/auth/login"
            className="text-[#475569] hover:text-[#0D9488] transition-colors"
          >
            Login
          </Link>
          <Link
            to="/auth/register"
            className="px-4 py-2 bg-[#0D9488] text-white rounded-md hover:bg-[#0D9488]/90 transition-colors"
          >
            Register
          </Link>{' '}
        </>
      )}
    </>
  );

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className=" bg-base-100 shadow-sm">
      <div className="navbar container mx-auto p-0 flex justify-between">
        <div className="flex items-center">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="p-5 lg:hidden">
              <Menu />
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to={'/'} className="text-xl font-semibold">
            Garments Tracker
          </Link>
        </div>
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2 flex items-center gap-2 font-semibold">
            {links}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
