import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import useAuth from '../../hooks/useAuth';

const CTASection = () => {
  const { user } = useAuth();
  return (
    <div>
      <section className="py-20 bg-linear-to-br from-[#0D9488] to-[#0F172A] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-2 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-3xl font-semibold">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Join hundreds of satisfied clients and experience the future of
              garment production tracking
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link
                  to="/dashboard"
                  className="btn btn-lg border-0 bg-white text-[#0D9488] rounded-md hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <Link
                  to="/auth/register"
                  className="btn btn-lg border-0 bg-white text-[#0D9488] rounded-md hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                >
                  Create Account
                </Link>
              )}

              <Link
                to="/all-products"
                className="btn btn-lg btn-outline border-2 border-white text-white rounded-md hover:bg-white hover:text-[#0D9488] transition-all"
              >
                Browse Products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CTASection;
