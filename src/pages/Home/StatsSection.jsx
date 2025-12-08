import React from 'react';
import { motion } from 'framer-motion';
import { MdBorderColor, MdOutlineWatchLater } from 'react-icons/md';
import { TbTruckDelivery } from 'react-icons/tb';
import { FaUsers } from 'react-icons/fa';

const StatsSection = () => {
  return (
    <div>
      <section className="py-12 bg-white ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-2">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              className="text-center space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <MdBorderColor size={40} className="mx-auto text-primary" />
              <span className="text-[#0D9488] text-2xl font-semibold mb-2">
                5000+
              </span>
              <p className="text-[#475569]">Orders Completed</p>
            </motion.div>
            <motion.div
              className="text-center space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <TbTruckDelivery size={40} className="mx-auto text-primary" />
              <span className="text-[#0D9488] text-2xl font-semibold mb-2">
                98%
              </span>
              <p className="text-[#475569]">On-Time Delivery</p>
            </motion.div>
            <motion.div
              className="text-center space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <FaUsers size={40} className="mx-auto text-primary" />
              <span className="text-[#0D9488] text-2xl font-semibold mb-2">
                250+
              </span>
              <p className="text-[#475569]">Happy Clients</p>
            </motion.div>
            <motion.div
              className="text-center space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <MdOutlineWatchLater size={40} className="mx-auto text-primary" />
              <span className="text-[#0D9488] text-2xl font-semibold mb-2">
                24/7
              </span>
              <p className="text-[#475569]">Live Tracking</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StatsSection;
