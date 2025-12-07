import React from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  Package,
  TrendingUp,
  CheckCircle,
  Users,
  Star,
  ArrowRight,
  Factory,
  Truck,
  ClipboardCheck,
} from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: ShoppingBag,
      title: 'Select Product',
      description:
        'Browse our extensive catalog and choose your desired garments',
    },
    {
      icon: Package,
      title: 'Place Order',
      description: 'Submit your order with specifications and delivery details',
    },
    {
      icon: Factory,
      title: 'Track Production',
      description:
        'Monitor real-time production progress through our tracking system',
    },
    {
      icon: Truck,
      title: 'Get Delivery',
      description: 'Receive your quality products on time, every time',
    },
  ];
  return (
    <div>
      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-2">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[#0F172A] text-3xl mb-4">How It Works</h2>
            <p className="text-[#475569] max-w-2xl mx-auto">
              Simple steps to get your garments from production to delivery
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative text-center"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-[#0D9488] to-[#2DD4BF] rounded-2xl mb-6 shadow-lg">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-[#0F172A] mb-3">{step.title}</h3>
                <p className="text-[#475569]">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
