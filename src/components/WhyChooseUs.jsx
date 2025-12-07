import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ClipboardCheck, TrendingUp, Users } from 'lucide-react';

const WhyChooseUs = () => {
  return (
    <div>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[#0F172A] text-3xl mb-6">Why Choose Us</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#0D9488]/10 rounded-xl flex items-center justify-center shrink-0">
                    <CheckCircle className="w-6 h-6 text-[#0D9488]" />
                  </div>
                  <div>
                    <h3 className="text-[#0F172A] mb-2">Quality Assurance</h3>
                    <p className="text-[#475569]">
                      Every product undergoes rigorous quality checks at
                      multiple stages of production
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#0D9488]/10 rounded-xl flex items-center justify-center shrink-0">
                    <TrendingUp className="w-6 h-6 text-[#0D9488]" />
                  </div>
                  <div>
                    <h3 className="text-[#0F172A] mb-2">Real-Time Tracking</h3>
                    <p className="text-[#475569]">
                      Monitor your orders from cutting to delivery with our
                      advanced tracking system
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#0D9488]/10 rounded-xl flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-[#0D9488]" />
                  </div>
                  <div>
                    <h3 className="text-[#0F172A] mb-2">Expert Team</h3>
                    <p className="text-[#475569]">
                      Skilled professionals dedicated to delivering excellence
                      in every stitch
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#0D9488]/10 rounded-xl flex items-center justify-center shrink-0">
                    <ClipboardCheck className="w-6 h-6 text-[#0D9488]" />
                  </div>
                  <div>
                    <h3 className="text-[#0F172A] mb-2">On-Time Delivery</h3>
                    <p className="text-[#475569]">
                      98% on-time delivery rate with transparent production
                      timelines
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1675176785803-bffbbb0cd2f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXh0aWxlJTIwbWFudWZhY3R1cmluZ3xlbnwxfHx8fDE3NjQ5MzIxNTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Manufacturing Excellence"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUs;
