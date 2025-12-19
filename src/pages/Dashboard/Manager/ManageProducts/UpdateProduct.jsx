import { motion } from 'framer-motion';
import { ArrowLeft, ImageIcon, Package, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate, useLocation } from 'react-router';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const UpdateProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();

  const { register, handleSubmit } = useForm();

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const { data: product = {}, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/product/${productId}`);
      setExistingImages(res.data?.images || []);
      return res.data;
    },
  });

  const handleSelectImages = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const from = location.state?.from || '/dashboard';
  const handleUpdateProduct = async (data) => {
    try {
      const uploadedUrls = [];
      for (const img of newImages) {
        const formData = new FormData();
        formData.append('image', img);
        const uploadUrl = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_HOST_KEY
        }`;
        const res = await axios.post(uploadUrl, formData);
        uploadedUrls.push(res.data.data.url);
      }

      const updatedProduct = {
        ...data,
        images: [...existingImages, ...uploadedUrls],
        updatedAt: new Date(),
      };

      await axiosSecure.patch(`/product/${productId}`, updatedProduct);
      toast.success('Product updated successfully!');
      navigate(from);
    } catch (error) {
      toast.error('Failed to update product');
    }
  };

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="container mx-auto px-3 py-5">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-[#475569] hover:text-[#0D9488] mb-8 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Products
      </button>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-md shadow space-y-6"
      >
        <h1 className="text-3xl font-semibold">Update Product</h1>

        <form
          onSubmit={handleSubmit(handleUpdateProduct)}
          className="space-y-6"
        >
          <div>
            <label className="block mb-2">Product Title</label>
            <div className="relative">
              <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                {...register('title', { required: true })}
                className="w-full pl-12 py-3 border rounded-md"
                defaultValue={product.title}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2">Description</label>
            <textarea
              {...register('description', { required: true })}
              rows={4}
              className="w-full px-4 py-3 border rounded-md"
              defaultValue={product.description}
            />
          </div>

          <div>
            <label className="block mb-2">Price</label>
            <input
              type="number"
              {...register('price', { required: true })}
              className="w-full px-4 py-3 border rounded-md"
              defaultValue={product.price}
            />
          </div>

          <div>
            <label className="block mb-2">Product Images</label>

            <label className="flex h-30 flex-col items-center justify-center  border border-dashed rounded-md cursor-pointer">
              <ImageIcon className="w-10 h-10 text-gray-400" />
              <p className="text-gray-500">Click to upload new images</p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleSelectImages}
                className="hidden"
              />
            </label>

            {/* existing images */}
            {existingImages.length > 0 && (
              <>
                <p className="mt-4 font-medium">Existing Images</p>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  {existingImages.map((img, index) => (
                    <div key={index} className="relative group">
                      <img src={img} className="w-full object-cover rounded" />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* new images */}
            {newImages.length > 0 && (
              <>
                <p className="mt-4 font-medium">New Images</p>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  {newImages.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(img)}
                        className="w-full  object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#0D9488] text-white py-3 rounded-md cursor-pointer"
          >
            Update Product
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateProduct;
