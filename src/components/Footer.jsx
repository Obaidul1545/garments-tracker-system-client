import React from 'react';
import { BiPhoneCall } from 'react-icons/bi';
import { BsMailbox } from 'react-icons/bs';
import { FaMapMarkerAlt, FaMapPin, FaPhoneVolume } from 'react-icons/fa';
import { RiMailSendFill } from 'react-icons/ri';
import { Link } from 'react-router';
import useAuth from '../hooks/useAuth';

const Footer = () => {
  const { user } = useAuth();
  return (
    <div>
      <footer className="bg-[#0F172A] text-white mt-5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-2 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-linear-to-br from-[#0D9488] to-[#2DD4BF] rounded-lg flex items-center justify-center">
                  <span>GT</span>
                </div>
                <span>Garments Tracker</span>
              </div>
              <p className="text-gray-400 mb-4">
                Smart Garments Production & Order Tracking System for modern
                manufacturing excellence.
              </p>
            </div>

            {/* Quick Links */}
            {/* login thakle profile er link dite hobe */}
            <div>
              <h3 className="mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-gray-400 hover:text-[#2DD4BF] transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/all-products"
                    className="text-gray-400 hover:text-[#2DD4BF] transition-colors"
                  >
                    All Products
                  </Link>
                </li>
                {user ? (
                  <>
                    <li>
                      <Link
                        to="/profile"
                        className="text-gray-400 hover:text-[#2DD4BF] transition-colors"
                      >
                        Profile
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/auth/login"
                        className="text-gray-400 hover:text-[#2DD4BF] transition-colors"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/auth/register"
                        className="text-gray-400 hover:text-[#2DD4BF] transition-colors"
                      >
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to={'/about-us'}
                    className="text-gray-400 hover:text-[#2DD4BF] transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to={'/contact'}
                    className="text-gray-400 hover:text-[#2DD4BF] transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-[#2DD4BF] transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-[#2DD4BF] transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-400">
                  <RiMailSendFill size={16} />

                  <span>info@garmentstracker.com</span>
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <FaPhoneVolume size={16} />
                  <span>+880 1700-000000</span>
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <FaMapMarkerAlt size={16} />
                  <span>123 Factory St, Industrial Zone</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 py-4 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Garments Tracker. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
