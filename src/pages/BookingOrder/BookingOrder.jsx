import React from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, MapPin, Phone, ShoppingCart, User } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { useForm, useWatch } from 'react-hook-form';
import LoadingSpinner from '../../components/LoadingSpinner';
import Swal from 'sweetalert2';

const BookingOrder = () => {
  const { user } = useAuth();
  const { productId } = useParams();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { data: product = {}, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/product/${productId}`);
      return res.data;
    },
  });

  const quantity = useWatch({
    control,
    name: 'quantity',
    defaultValue: 0,
  });
  const totalPrice = quantity * product.price;
  const handleSubmitOrder = (data) => {
    const orderData = {
      ...data,
      productTitle: product.title,
      email: user.email,
      productId: productId,
      totalPrice,
    };

    Swal.fire({
      title: 'Agree with the Cost?',
      html: `<p class="text-gray-700">You will be charged <span class="font-semibold text-[#0D9488]">${totalPrice.toFixed(
        2
      )} USD</span></p>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0D9488',
      cancelButtonColor: '#0F172A',
      confirmButtonText: 'I Agree!',
      cancelButtonText: 'Cancel',
      background: '#f8fafc',
      color: '#0F172A',
      customClass: {
        title: 'text-[#0F172A] font-bold text-lg',
        content: 'text-gray-700 text-sm',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // navigate('/dashboard/my-parcels');
        axiosSecure.post('/orders', orderData).then(() => {
          Swal.fire({
            title: 'Order placed!',
            text: 'Your order has been placed successfully.',
            icon: 'success',
            confirmButtonColor: '#0D9488',
            background: '#f8fafc',
            color: '#0F172A',
          });
        });
      }
    });
  };

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <div>
      <div className=" bg-[#E2E8F0] my-5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-2">
          <Link
            to={`/product-details/${productId}`}
            className="inline-flex items-center gap-2 text-[#475569] hover:text-[#0D9488] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Product
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white rounded-xl shadow-xl p-8 lg:p-10">
              <h1 className="text-[#0F172A] font-semibold text-3xl mb-2">
                Place Your Order
              </h1>
              <p className="text-[#475569] mb-8">
                Fill in the details below to complete your order
              </p>

              <div className="bg-linear-to-br from-[#0D9488] to-[#0F172A] rounded-xl p-6 mb-8">
                <div className="flex items-center gap-4 text-white">
                  <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="grow">
                    <h3 className="text-white mb-1">{product.title}</h3>
                    <p className="text-gray-200">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-200 mb-1">Unit Price</p>
                    <p className="text-white">${product.price}</p>
                  </div>
                </div>
              </div>

              <form
                onSubmit={handleSubmit(handleSubmitOrder)}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#0F172A] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-[#475569]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#0F172A] mb-2">Product</label>
                    <input
                      type="text"
                      value={product.title}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-[#475569]"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#0F172A] mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#475569]" />
                      <input
                        type="text"
                        {...register('firstName', {
                          required: 'First name is required',
                        })}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0D9488] focus:border-transparent outline-none transition-all"
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-red-500 text-sm">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[#0F172A] mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#475569]" />
                      <input
                        {...register('lastName', {
                          required: 'Last name is required',
                        })}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0D9488] focus:border-transparent outline-none transition-all"
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                    {errors.lastName && (
                      <p className="text-red-500 text-sm">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-[#0F172A] mb-2">
                    Order Quantity (Min: {product.minimumOrder}, Max:{' '}
                    {product.availableQuantity})
                  </label>
                  <div className="relative">
                    <ShoppingCart className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#475569]" />
                    <input
                      type="number"
                      {...register('quantity', {
                        required: 'Quantity is required',
                        min: {
                          value: product.minimumOrder,
                          message: `Minimum order is ${product.minimumOrder}`,
                        },
                        max: {
                          value: product.availableQuantity,
                          message: `Available quantity is ${product.availableQuantity}`,
                        },
                      })}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0D9488] focus:border-transparent outline-none transition-all"
                      required
                    />
                  </div>
                  {errors.quantity && (
                    <p className="text-red-500 text-sm">
                      {errors.quantity.message}
                    </p>
                  )}
                </div>

                <div className="bg-[#2DD4BF]/10 rounded-2xl p-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[#0F172A]">Total Price</span>
                    <span className="text-[#0D9488]">
                      ${totalPrice.toFixed(2)} USD
                    </span>
                  </div>
                  <p className="text-[#475569] mt-2">
                    {quantity === '' ? 0 : quantity} units × ${product.price}
                  </p>
                </div>

                <div>
                  <label className="block text-[#0F172A] mb-2">
                    Contact Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#475569]" />
                    <input
                      type="tel"
                      {...register('contactNumber', {
                        required: 'Contact number is required',
                      })}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0D9488] focus:border-transparent outline-none transition-all"
                      placeholder="+013 555 123-4567"
                      required
                    />
                  </div>
                  {errors.contactNumber && (
                    <p className="text-red-500 text-sm">
                      {errors.contactNumber.message}
                    </p>
                  )}
                </div>

                {/* Delivery Address */}
                <div>
                  <label className="block text-[#0F172A] mb-2">
                    Delivery Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 w-5 h-5 text-[#475569]" />
                    <textarea
                      {...register('deliveryAddress', {
                        required: 'Delivery address is required',
                      })}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0D9488] focus:border-transparent outline-none transition-all resize-none"
                      rows={3}
                      placeholder="Enter your complete delivery address"
                      required
                    />
                  </div>
                  {errors.deliveryAddress && (
                    <p className="text-red-500 text-sm">
                      {errors.deliveryAddress.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[#0F172A] mb-2">
                    Additional Notes (Optional)
                  </label>
                  <div className="relative">
                    <textarea
                      {...register('additionalNotes')}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0D9488] focus:border-transparent outline-none transition-all resize-none"
                      rows={3}
                      placeholder="Any special requirements or instructions..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-[#0D9488] text-white rounded-md hover:bg-[#0D9488]/90 transition-colors  shadow-lg hover:shadow-xl cursor-pointer"
                >
                  Place Order
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BookingOrder;
