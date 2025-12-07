import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import loginImg from '../../../assets/login.png';
import { FiEyeOff } from 'react-icons/fi';
import { BsEye } from 'react-icons/bs';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';

const Login = () => {
  const { logInUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    logInUser(data.email, data.password)
      .then(() => {
        toast.success('User sign in Success full!!');
        navigate(location.state || '/');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center">
      <div className=" flex items-center justify-center p-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
          {/* Title */}
          <h2 className="text-2xl font-semibold text-center text-slate-900">
            Welcome Back
          </h2>
          <p className="text-center text-slate-500 mb-6">
            Sign in to your account to continue
          </p>

          {/* Form Start */}
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email Address</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full focus:ring-2 focus:ring-[#0D9488] outline-none"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="input input-bordered w-full focus:ring-2 focus:ring-[#0D9488] outline-none"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[a-z]).+$/,
                    message:
                      'Password must contain uppercase & lowercase letters',
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 absolute top-9 right-4 cursor-pointer z-10"
              >
                {showPassword ? <FiEyeOff size={18} /> : <BsEye size={18} />}
              </button>
              {/* Errors */}
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button className="btn bg-teal-600 hover:bg-teal-700 text-white w-full rounded-md">
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-5">
            <div className="grow h-px bg-gray-300"></div>
            <span className="px-2 text-slate-500 text-sm">
              Or continue with
            </span>
            <div className="grow h-px bg-gray-300"></div>
          </div>

          {/* Social Login Buttons */}
          <SocialLogin></SocialLogin>

          {/* Redirect */}
          <p className="text-center text-sm mt-6">
            Don’t have an account?
            <Link
              to="/auth/register"
              className="text-[#0D9488] hover:underline ml-1"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>

      <div>
        <img src={loginImg} alt="" />
      </div>
    </div>
  );
};

export default Login;
