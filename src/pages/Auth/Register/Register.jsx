import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import { FiEyeOff } from 'react-icons/fi';
import { BsEye } from 'react-icons/bs';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (data) => {
    setLoading(true);

    // Submit to backend
    console.log(data);

    setLoading(false);
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
                disabled={loading}
                className="btn bg-teal-600 hover:bg-teal-700 text-white w-full rounded-md"
              >
                {loading ? 'Creating Account...' : 'Register'}
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
