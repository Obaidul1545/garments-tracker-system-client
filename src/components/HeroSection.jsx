import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const HeroSection = () => {
  return (
    <div>
      <section className="relative bg-linear-to-br from-[#0D9488] to-[#0F172A] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_35px,rgba(255,255,255,0.05)_35px,rgba(255,255,255,0.05)_70px)]"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-2 py-10 lg:py-25 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="mb-6 text-3xl">
                Smart Garments Production & Order Tracking System
              </h1>
              <p className="text-lg text-gray-200 mb-8">
                Streamline your garment manufacturing process with real-time
                tracking, seamless order management, and quality assurance at
                every step.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="btn btn-lg border-0 bg-white text-[#0D9488] rounded-md hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl "
                >
                  View Products
                </Link>
                <Link
                  to="/register"
                  className="btn btn-lg border-0 bg-[#2DD4BF] text-white rounded-md hover:bg-[#2DD4BF]/90 transition-all shadow-lg hover:shadow-xl"
                >
                  Book Now
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1721578006568-17901600cff3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJtZW50JTIwZmFjdG9yeSUyMHByb2R1Y3Rpb258ZW58MXx8fHwxNzY0OTQ4MjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Garment Factory"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
