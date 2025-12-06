import React from 'react';
import { MdLogout } from 'react-icons/md';
import { Link, NavLink } from 'react-router';

const Navbar = () => {
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
      <div className="flex items-center gap-3 ml-4">
        <Link to="/profile" className="flex items-center gap-2">
          {/* <img
            src={user.photoURL}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover border-2 border-[#0D9488]"
          /> */}
        </Link>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#0D9488] text-white rounded-md hover:bg-[#0D9488]/90 transition-colors">
          <MdLogout size={16} />
          Logout
        </button>
      </div>
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
      </Link>
    </>
  );

  return (
    <div className=" bg-base-100 shadow-sm">
      <div className="navbar container mx-auto p-0">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {' '}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{' '}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl ">daisyUI</a>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1 flex items-center gap-2">
            {links}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
