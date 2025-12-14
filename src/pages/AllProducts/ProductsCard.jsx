import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router';

const ProductsCard = ({ product, index }) => {
  return (
    <div>
      <motion.div
        key={product.id}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all group"
      >
        <div className="relative overflow-hidden h-64">
          <img
            src={product.image || product?.images?.[0]}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-[#0D9488] text-white rounded-full">
              {product.category}
            </span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-[#0F172A] font-semibold mb-2">{product.title}</h3>
          <p className="text-[#475569] mb-4 line-clamp-2">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-[#475569]">Price</p>
              <p className="text-[#0D9488]">${product.price}</p>
            </div>
            <div>
              <p className="text-[#475569]">Available</p>
              <p className="text-[#0F172A]">
                {product.availableQuantity} units
              </p>
            </div>
          </div>

          <Link
            to={`/product-details/${product._id}`}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#0D9488] text-white rounded-xl hover:bg-[#0D9488]/90 transition-colors"
          >
            View Details
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductsCard;
