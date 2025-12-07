import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

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
    {
      name: 'Liam Brown',
      role: 'Merchandising Manager',
      image: 'https://i.pravatar.cc/150?img=11',
      content:
        'Their production tracking saved us countless hours. Everything is organized and completely transparent.',
      rating: 5,
    },
    {
      name: 'Sophia Martinez',
      role: 'Fashion Brand Owner',
      image: 'https://i.pravatar.cc/150?img=12',
      content:
        'Our workflow improved dramatically. Real-time updates ensure we never miss a production deadline.',
      rating: 5,
    },
    {
      name: 'Ethan Walker',
      role: 'Quality Control Specialist',
      image: 'https://i.pravatar.cc/150?img=13',
      content:
        'The system helps us detect production issues early. Quality checks are smoother than ever.',
      rating: 5,
    },
    {
      name: 'Isabella Kim',
      role: 'Supply Chain Coordinator',
      image: 'https://i.pravatar.cc/150?img=14',
      content:
        'Communication between suppliers and teams became effortless. This platform is a game changer.',
      rating: 5,
    },
    {
      name: 'Noah Thompson',
      role: 'Garment Production Manager',
      image: 'https://i.pravatar.cc/150?img=15',
      content:
        'We reduced delays and improved efficiency significantly. The dashboard gives complete clarity.',
      rating: 5,
    },
    {
      name: 'Olivia Parker',
      role: 'Textile Buyer',
      image: 'https://i.pravatar.cc/150?img=16',
      content:
        'Order tracking is super accurate. I can finally rely on a system that shows real progress updates.',
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
            <h2 className="text-[#0F172A] font-semibold text-3xl mb-4">
              Customer Feedback
            </h2>
            <p className="text-[#475569] max-w-2xl mx-auto">
              Hear what our clients say about their experience
            </p>
          </motion.div>

          <div>
            <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              spaceBetween={10}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              coverflowEffect={{
                rotate: 10,
                stretch: 50,
                depth: 100,
                modifier: 1,
                scale: 0.75,
                slideShadows: true,
              }}
              pagination={true}
              modules={[EffectCoverflow, Pagination, Autoplay]}
              loop={true}
              autoplay={{
                delay: 1500,
                disableOnInteraction: false,
              }}
              className="mySwiper  "
            >
              {feedbacks.map((feedback, i) => (
                <SwiperSlide key={i} className="mb-15">
                  <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow">
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
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomerFeedback;
