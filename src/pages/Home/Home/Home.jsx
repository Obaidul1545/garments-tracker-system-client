import React from 'react';
import HeroSection from '../../../components/HeroSection';
import StatsSection from '../../../components/StatsSection';
import { motion } from 'framer-motion';
import HowItWorks from '../../../components/HowItWorks';
import CustomerFeedback from '../../../components/CustomerFeedback';
import WhyChooseUs from '../../../components/WhyChooseUs';
import CTASection from '../../../components/CTASection';

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <StatsSection></StatsSection>

      {/* Products Section */}
      <section className="container mx-auto my-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[#0F172A] mb-4">Our Products</h2>
          <p className="text-[#475569] max-w-2xl mx-auto">
            Discover our premium collection of garments manufactured with
            precision and care
          </p>
        </motion.div>
      </section>

      <HowItWorks></HowItWorks>
      <CustomerFeedback></CustomerFeedback>
      <WhyChooseUs></WhyChooseUs>
      <CTASection></CTASection>
    </div>
  );
};

export default Home;
