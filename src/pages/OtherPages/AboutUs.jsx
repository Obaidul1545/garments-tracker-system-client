import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Users, Factory, Globe } from 'lucide-react';
import { Link } from 'react-router';

const AboutUs = () => {
  return (
    <div className="bg-[#E2E8F0] py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-2">
        {/* Top Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl font-bold text-[#0F172A] mb-4">
            About <span className="text-[#0F766E]">Our Company</span>
          </h1>
          <p className="text-[#475569] leading-relaxed">
            We are a modern garment production tracking & order management
            system built to bring transparency, speed, and efficiency to the
            apparel industry. Our mission is to connect buyers, factories, and
            production teams with real-time visibility and seamless workflow.
          </p>
        </motion.div>

        {/* Mission + Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-2xl shadow-md border border-gray-200"
          >
            <h2 className="text-2xl font-semibold text-[#0F172A] mb-4">
              Our Mission
            </h2>
            <p className="text-[#475569]">
              To empower garment manufacturers and buyers with a real-time,
              data-driven platform that ensures accurate planning, faster
              delivery, and 100% production transparency.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-2xl shadow-md border border-gray-200"
          >
            <h2 className="text-2xl font-semibold text-[#0F172A] mb-4">
              Our Vision
            </h2>
            <p className="text-[#475569]">
              To become the most trusted digital garment supply chain ecosystem
              that connects global brands with efficient and transparent
              factories worldwide.
            </p>
          </motion.div>
        </div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl font-semibold text-[#0F172A] mb-4">
            Why Choose Us
          </h2>
          <p className="text-[#475569] max-w-2xl mx-auto">
            Our platform is designed with industry experts to solve real-life
            production problems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow hover:shadow-xl transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <Factory className="w-8 h-8 text-[#0F766E]" />
              <h3 className="text-xl font-semibold text-[#0F172A]">
                Real-Time Production Tracking
              </h3>
            </div>
            <p className="text-[#475569]">
              Monitor cutting, sewing, finishing, QC, and packing in real-time.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow hover:shadow-xl transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-8 h-8 text-[#0F766E]" />
              <h3 className="text-xl font-semibold text-[#0F172A]">
                Multi-Department Collaboration
              </h3>
            </div>
            <p className="text-[#475569]">
              Teams work together seamlessly — merchandiser to factory to buyer.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow hover:shadow-xl transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <Globe className="w-8 h-8 text-[#0F766E]" />
              <h3 className="text-xl font-semibold text-[#0F172A]">
                Global Accessibility
              </h3>
            </div>
            <p className="text-[#475569]">
              Access your production dashboard from anywhere in the world.
            </p>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <h2 className="text-3xl font-semibold text-[#0F172A] mb-4">
            Our Commitment
          </h2>
          <p className="text-[#475569] max-w-2xl mx-auto mb-6">
            We’re committed to transforming garment production with accuracy,
            transparency, and technology — helping brands deliver quality
            products on time, every time.
          </p>

          <Link
            to={'/contact'}
            className="bg-[#0F766E] btn btn-lg  rounded-md text-white font-semibold hover:bg-[#2DD4BF] transition"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
