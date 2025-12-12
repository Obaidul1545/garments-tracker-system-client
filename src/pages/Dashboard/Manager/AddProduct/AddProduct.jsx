import { motion } from 'framer-motion';
import { DollarSign, FileText, ImageIcon, Package, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import axios from 'axios';
import useAuth from '../../../../hooks/useAuth';
import { useNavigate } from 'react-router';

const AddProduct = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const [images, setImages] = useState([]);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleSelectImages = (e) => {
    const newFiles = Array.from(e.target.files);
    setImages((prev) => [...prev, ...newFiles]);
  };
  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // const handleAddProduct = async (data) => {
  //   try {
  //     const formData = new FormData();
  //     const uploadedUrls = [];
  //     for (const img of images) {
  //       const formData = new FormData();
  //       formData.append('image', img);
  //       const url = `https://api.imgbb.com/1/upload?key=${
  //         import.meta.env.VITE_IMAGE_HOST_KEY
  //       }`;
  //       const res = await axios.post(url, formData);
  //       uploadedUrls.push(res.data.data.url);
  //     }

  //     const res = await axiosSecure.post('/add-product', formData);

  //     console.log('Server Response:', res.data);
  //     toast.success('Product added successfully!');

  //     reset();
  //     setImages([]);
  //   } catch (error) {
  //     console.log(error);
  //     toast.error('Failed to add product!');
  //   }
  // };
  const handleAddProduct = async (data) => {
    try {
      const uploadedUrls = [];
      for (const img of images) {
        const formData = new FormData();
        formData.append('image', img);
        const uploadUrl = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_HOST_KEY
        }`;
        const res = await axios.post(uploadUrl, formData);
        uploadedUrls.push(res.data.data.url);
      }

      const productData = {
        title: data.title,
        description: data.description,
        category: data.category,
        price: data.price,
        availableQuantity: data.availableQuantity,
        minimumOrder: data.minimumOrder,
        images: uploadedUrls,
        demoVideo: data.demoVideo || null,
        paymentOptions: data.paymentOptions,
        showOnHome: data.showOnHome,
        createdBy: 'Manager User',
        createdByEmail: user?.email,
        createdAt: new Date(),
      };
      const res = await axiosSecure.post('/add-product', productData);
      if (res.data.insertedId) {
        toast.success('Product added successfully!');
        reset();
        setImages([]);
        navigate('/dashboard/manage-products');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to add product!');
    }
  };

  return (
    <div>
      <div className="container mx-auto px-3 sm:px-4 lg:px-4 py-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-[#0F172A] text-3xl font-semibold mb-2">
              Add New Product
            </h1>
            <p className="text-[#475569]">Create a new product listing</p>
          </div>

          <form
            onSubmit={handleSubmit(handleAddProduct)}
            className="bg-white rounded-md p-8 shadow-md space-y-6"
          >
            <div>
              <label className="block text-[#0F172A] mb-2">Product Title</label>
              <div className="relative">
                <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#475569]" />
                <input
                  type="text"
                  {...register('title', { required: true })}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0D9488] focus:border-transparent outline-none transition-all"
                  placeholder="Enter product title"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[#0F172A] mb-2">Description</label>
              <div className="relative">
                <FileText className="absolute left-4 top-4 w-5 h-5 text-[#475569]" />
                <textarea
                  {...register('description', { required: true })}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0D9488] focus:border-transparent outline-none transition-all resize-none"
                  rows={4}
                  placeholder="Product description..."
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#0F172A] mb-2">Category</label>
                <select
                  {...register('category', { required: true })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0D9488] focus:border-transparent outline-none transition-all"
                >
                  <option value="Shirt">Shirt</option>
                  <option value="T-Shirt">T-Shirt</option>
                  <option value="Pant">Pant</option>
                  <option value="Jacket">Jacket</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Sports">Sports</option>
                  <option value="Kids">Kids</option>
                  <option value="Formal Wear">Formal Wear</option>
                  <option value="Casual Wear">Casual Wear</option>
                  <option value="Premium">Premium</option>
                </select>
              </div>

              <div>
                <label className="block text-[#0F172A] mb-2">Price (USD)</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#475569]" />
                  <input
                    type="number"
                    step="0.01"
                    {...register('price', { required: true })}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0D9488] focus:border-transparent outline-none transition-all"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#0F172A] mb-2">
                  Available Quantity
                </label>
                <input
                  type="number"
                  {...register('availableQuantity', { required: true })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0D9488] focus:border-transparent outline-none transition-all"
                  placeholder="1000"
                  required
                />
              </div>

              <div>
                <label className="block text-[#0F172A] mb-2">
                  Minimum Order
                </label>
                <input
                  type="number"
                  {...register('minimumOrder', { required: true })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0D9488] focus:border-transparent outline-none transition-all"
                  placeholder="50"
                  required
                />
              </div>
            </div>

            <label className="block text-[#0F172A] ">Product Images</label>
            <div className="">
              <label
                htmlFor="images"
                className="flex flex-col items-center justify-center p-5  h-40 bg-white border border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#0D9488] transition-all"
              >
                <ImageIcon className="w-10 h-10 text-gray-400" />
                <p className="text-gray-500 mt-2">
                  Click to upload multiple images
                </p>
                <input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleSelectImages}
                  className="hidden"
                />
              </label>

              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-3">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="relative group border rounded-lg overflow-hidden"
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        alt=""
                        className="w-full h-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-[#0F172A] mb-2">
                Demo Video Link (Optional)
              </label>
              <input
                type="url"
                {...register('demoVideo')}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0D9488] focus:border-transparent outline-none transition-all"
                placeholder="https://demoLink.com/..."
              />
            </div>

            <div>
              <label className="block text-[#0F172A] mb-2">
                Payment Options
              </label>
              <select
                {...register('paymentOptions')}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0D9488] focus:border-transparent outline-none transition-all"
              >
                <option value="PayFirst">PayFirst</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="showOnHome"
                {...register('showOnHome')}
                className="w-5 h-5 text-[#0D9488] rounded focus:ring-2 focus:ring-[#0D9488]"
              />
              <label htmlFor="showOnHome" className="text-[#0F172A]">
                Show this product on the homepage
              </label>
            </div>

            <div className=" pt-4">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-[#0D9488] text-white rounded-md hover:bg-[#0D9488]/90 transition-colors  cursor-pointer"
              >
                Add Product
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddProduct;
