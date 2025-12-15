import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import ProductsCard from '../AllProducts/ProductsCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link } from 'react-router';

const LatestProduct = () => {
  const axiosSecure = useAxiosSecure();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/latest-products`);
      return res.data;
    },
  });
  return (
    <div>
      <section className="container mx-auto my-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[#0F172A] font-semibold text-3xl mb-4">
            Our Products
          </h2>
          <p className="text-[#475569] max-w-2xl mx-auto">
            Discover our premium collection of garments manufactured with
            precision and care
          </p>
        </motion.div>

        {isLoading ? (
          <LoadingSpinner></LoadingSpinner>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <ProductsCard
                key={product._id}
                product={product}
                index={index}
              ></ProductsCard>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/all-products"
            className="inline-block px-8 py-4 bg-[#0D9488] text-white rounded-md hover:bg-[#0D9488]/90 transition-colors"
          >
            View All Products
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LatestProduct;
