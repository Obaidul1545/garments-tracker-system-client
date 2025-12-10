import { motion } from 'framer-motion';
import { DollarSign, FileText, Package } from 'lucide-react';

const AddProduct = () => {
  const image = [];
  const handleSubmit = () => {};

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
            onSubmit={handleSubmit}
            className="bg-white rounded-md p-8 shadow-md space-y-6"
          >
            <div>
              <label className="block text-[#0F172A] mb-2">Product Title</label>
              <div className="relative">
                <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#475569]" />
                <input
                  type="text"
                  // value={formData.title}
                  // onChange={(e) =>
                  //   setFormData({ ...formData, title: e.target.value })
                  // }
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
                  // value={formData.description}
                  // onChange={(e) =>
                  //   setFormData({ ...formData, description: e.target.value })
                  // }
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
                  // value={formData.paymentMode}
                  // onChange={(e) =>
                  //   setFormData({ ...formData, paymentMode: e.target.value })
                  // }
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
                    // value={formData.price}
                    // onChange={(e) =>
                    //   setFormData({ ...formData, price: e.target.value })
                    // }
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
                  // value={formData.quantity}
                  // onChange={(e) =>
                  //   setFormData({ ...formData, quantity: e.target.value })
                  // }
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
                  // value={formData.minimumOrder}
                  // onChange={(e) =>
                  //   setFormData({ ...formData, minimumOrder: e.target.value })
                  // }
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0D9488] focus:border-transparent outline-none transition-all"
                  placeholder="50"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[#0F172A] mb-2">
                Product Images
              </label>

              <div className="relative">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  // onChange={(e) =>
                  //   setFormData({
                  //     ...formData,
                  //     images: [...e.target.files],
                  //   })
                  // }
                  className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-md 
                 focus:ring-2 focus:ring-[#0D9488] focus:border-transparent 
                 outline-none transition-all bg-white"
                />
              </div>

              {/* show preview image array dite hobe  */}
              {image?.images?.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {Array.from(image.images).map((img, i) => (
                    <img
                      key={i}
                      src={URL.createObjectURL(img)}
                      className="w-full h-24 object-cover rounded-md border"
                    />
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
                // value={formData.demoVideo}
                // onChange={(e) =>
                //   setFormData({ ...formData, demoVideo: e.target.value })
                // }
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0D9488] focus:border-transparent outline-none transition-all"
                placeholder="https://demoLink.com/..."
              />
            </div>

            <div>
              <label className="block text-[#0F172A] mb-2">Payment Mode</label>
              <select
                // value={formData.paymentMode}
                // onChange={(e) =>
                //   setFormData({ ...formData, paymentMode: e.target.value })
                // }
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
                // checked={formData.showOnHome}
                // onChange={(e) =>
                //   setFormData({ ...formData, showOnHome: e.target.checked })
                // }
                className="w-5 h-5 text-[#0D9488] rounded focus:ring-2 focus:ring-[#0D9488]"
              />
              <label htmlFor="showOnHome" className="text-[#0F172A]">
                Show this product on the homepage
              </label>
            </div>

            <div className=" pt-4">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-[#0D9488] text-white rounded-md hover:bg-[#0D9488]/90 transition-colors disabled:opacity-50 cursor-pointer"
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
