import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const CustomerFeedback = () => {
  const feedbacks = [
    {
      name: 'Sarah Johnson',
      role: 'Retail Manager',
      image: 'https://i.pravatar.cc/150?img=1',
      content:
        'The tracking system is incredibly detailed. We can monitor every stage of production in real-time.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Factory Owner',
      image: 'https://i.pravatar.cc/150?img=2',
      content:
        'This platform has revolutionized how we manage orders and communicate with buyers. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Emma Davis',
      role: 'Boutique Owner',
      image: 'https://i.pravatar.cc/150?img=3',
      content:
        'Outstanding service and quality. The production timeline is always accurate and transparent.',
      rating: 5,
    },
  ];
  return (
    <div>
      <section className="py-20 bg-[#E2E8F0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[#0F172A] text-3xl mb-4">Customer Feedback</h2>
            <p className="text-[#475569] max-w-2xl mx-auto">
              Hear what our clients say about their experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {feedbacks.map((feedback, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(feedback.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-[#2DD4BF] text-[#2DD4BF]"
                    />
                  ))}
                </div>
                <p className="text-[#475569] mb-6 italic">
                  &quot;{feedback.content}&quot;
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={feedback.image}
                    alt={feedback.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-[#0F172A]">{feedback.name}</div>
                    <div className="text-[#475569]">{feedback.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomerFeedback;
