import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import { FiEyeOff } from 'react-icons/fi';
import { BsEye } from 'react-icons/bs';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Register = () => {
  const axiosSecure = useAxiosSecure();
  const { registerUser, updateUser, setLoading } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const location = useLocation;
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [regLoading, setRegLoading] = useState(false);

  const handleRegister = async (data) => {
    setRegLoading(true);
    const profileImg = data.photo[0];
    registerUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append('image', profileImg);
        const imageApiUrl = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_HOST_KEY
        }`;
        axios.post(imageApiUrl, formData).then((res) => {
          const photoURL = res.data.data.url;
          const userInfo = {
            displayName: data.name,
            email: data.email,
            photoURL: photoURL,
            role: data.role,
          };
          // database

          axiosSecure.post('/users', userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log('create user in database');
            }
          });

          // update
          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };
          updateUser(userProfile)
            .then(() => {
              setLoading(false);
              reset();
              navigate(location.state || '/');
            })
            .catch((error) => {
              toast.error(error.message);
            });
        });
        toast.success('Register Success full!!!');
      })
      .catch((error) => {
        toast.error(error.message);
      });

    setRegLoading(false);
  };

  return (
    <div>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-[#0F172A] mb-2 text-2xl font-semibold">
                Create Account
              </h2>
              <p className="text-[#475569]">
                Join our garment tracking platform
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-[#0F172A] mb-2">Full Name</label>
                <div>
                  <input
                    type="text"
                    {...register('name', { required: true })}
                    className="w-full  p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0D9488] outline-none"
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">Name is required*</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-[#0F172A] mb-2">
                  Email Address
                </label>
                <div>
                  <input
                    type="email"
                    {...register('email', { required: true })}
                    className="w-full  p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0D9488] outline-none"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Upload Photo */}
              <div>
                <label className="block text-[#0F172A] mb-2">
                  Upload Photo
                </label>

                <input
                  type="file"
                  accept="image/*"
                  {...register('photo', { required: true })}
                  className="file-input file-input-bordered w-full rounded-md"
                />

                {errors.photo && (
                  <p className="text-red-500 text-sm mt-1">
                    Photo is required*
                  </p>
                )}
              </div>

              {/* Role */}
              <div>
                <label className="block text-[#0F172A] mb-2">
                  Account Role
                </label>
                <div>
                  <select
                    {...register('role', { required: true })}
                    className="w-full  p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0D9488] outline-none"
                  >
                    <option value="buyer">Buyer</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>
              </div>

              {/* Status Info */}
              <div className="bg-[#2DD4BF]/10 rounded-2xl p-4">
                <p className="text-[#475569]">
                  <span className="text-[#0D9488]">Account Status:</span> Your
                  account will be set to “Pending” until approved by an
                  administrator.
                </p>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[#0F172A] mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Must be at least 6 characters',
                      },
                      validate: {
                        hasUpper: (v) =>
                          /[A-Z]/.test(v) ||
                          'Must contain at least one uppercase letter',
                        hasLower: (v) =>
                          /[a-z]/.test(v) ||
                          'Must contain at least one lowercase letter',
                      },
                    })}
                    className="w-full  p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0D9488] outline-none "
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 absolute top-4.5 right-5 cursor-pointer"
                  >
                    {showPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <BsEye size={18} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Password Requirements */}
              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-[#475569] mb-2">Password must contain:</p>
                <ul className="space-y-1 text-[#475569]">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0D9488]"></div>
                    At least 6 characters
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0D9488]"></div>
                    One uppercase letter
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0D9488]"></div>
                    One lowercase letter
                  </li>
                </ul>
              </div>

              <button
                type="submit"
                className="btn bg-teal-600 hover:bg-teal-700 text-white w-full rounded-md"
              >
                Register
              </button>
            </form>

            <div className="flex items-center my-5">
              <div className="grow h-px bg-gray-300"></div>
              <span className="px-2 text-slate-500 text-sm">
                Or continue with
              </span>
              <div className="grow h-px bg-gray-300"></div>
            </div>

            {/* Social Login Buttons */}
            <SocialLogin></SocialLogin>

            {/* Login Link */}
            <p className="text-center mt-6 text-[#475569]">
              Already have an account?{' '}
              <Link to="/auth/login" className="text-[#0D9488] hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
