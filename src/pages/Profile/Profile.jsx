import { motion } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import { FiAlertTriangle } from 'react-icons/fi';
import { BiShield, BiUser } from 'react-icons/bi';
import { BsMailbox } from 'react-icons/bs';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/LoadingSpinner';

const Profile = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const { data: databaseUser = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div>
      <div className="max-w-4xl mx-auto my-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-[#0F172A] text-4xl mb-2">My Profile</h1>
            <p className="text-[#475569]">
              View and manage your account information
            </p>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
              <div className="relative">
                <img
                  src={databaseUser?.photoURL}
                  alt={databaseUser?.displayName}
                  className="w-32 h-32 rounded-2xl object-cover border-4 border-[#0D9488]"
                />
                <div
                  className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center ${
                    databaseUser?.accountStatus === 'active'
                      ? 'bg-green-500'
                      : databaseUser?.accountStatus === 'pending'
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                >
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-[#0F172A] mb-2">
                  {databaseUser?.displayName}
                </h2>
                <div className="flex flex-col md:flex-row items-center gap-3 mb-3">
                  <span className="px-4 py-1 bg-[#0D9488]/20 text-[#0D9488] rounded-full capitalize">
                    {databaseUser?.role}
                  </span>
                  <span
                    className={`px-4 py-1 rounded-full capitalize ${
                      databaseUser?.accountStatus === 'active'
                        ? 'bg-green-100 text-green-700'
                        : databaseUser?.accountStatus === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {databaseUser?.accountStatus}
                  </span>
                </div>
                <p className="text-[#475569]">
                  Member since {new Date(databaseUser.createdAt).getFullYear()}
                </p>
              </div>
            </div>

            {/* Account Details */}
            <div className="space-y-6">
              <h3 className="text-[#0F172A]">Account Details</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-[#E2E8F0] rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <BiUser className="w-5 h-5 text-[#0D9488]" />
                    <span className="text-[#475569]">Full Name</span>
                  </div>
                  <p className="text-[#0F172A]">{databaseUser?.displayName}</p>
                </div>

                <div className="p-4 bg-[#E2E8F0] rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <BsMailbox className="w-5 h-5 text-[#0D9488]" />
                    <span className="text-[#475569]">Email Address</span>
                  </div>
                  <p className="text-[#0F172A]">{databaseUser?.email}</p>
                </div>

                <div className="p-4 bg-[#E2E8F0] rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <BiShield className="w-5 h-5 text-[#0D9488]" />
                    <span className="text-[#475569]">Role</span>
                  </div>
                  <p className="text-[#0F172A] capitalize">
                    {databaseUser?.role}
                  </p>
                </div>

                <div className="p-4 bg-[#E2E8F0] rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <FiAlertTriangle className="w-5 h-5 text-[#0D9488]" />
                    <span className="text-[#475569]">Account Status</span>
                  </div>
                  <p
                    className={`capitalize ${
                      databaseUser?.accountStatus === 'active'
                        ? 'text-green-600'
                        : databaseUser?.accountStatus === 'pending'
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}
                  >
                    {databaseUser?.accountStatus}
                  </p>
                </div>
              </div>

              {/* {databaseUser?.accountStatus === 'suspended' &&
                databaseUser?.suspendReason && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-1" />
                      <div>
                        <h3 className="text-red-900 mb-2">Account Suspended</h3>
                        <p className="text-red-700 mb-2">
                          Your account has been suspended for the following
                          reason:
                        </p>
                        <p className="text-red-800 italic">
                          &quot;{databaseUser?.suspendReason}&quot;
                        </p>
                        <p className="text-red-700 mt-4">
                          Please contact support for assistance.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
        
              {databaseUser?.accountStatus === 'pending' && (
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
                  <div className="flex items-start gap-3">
                    <FiAlertCircle className="w-6 h-6 text-yellow-600 shrink-0 mt-1" />
                    <div>
                      <h3 className="text-yellow-900 mb-2">
                        Account Pending Approval
                      </h3>
                      <p className="text-yellow-700">
                        Your account is awaiting administrator approval. You
                        will receive an email once your account is activated.
                      </p>
                    </div>
                  </div>
                </div>
              )} */}
            </div>
          </div>

          {/* Activity Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="text-[#0D9488] mb-2">Total Orders</div>
              <div className="text-[#0F172A]">15</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="text-[#0D9488] mb-2">Total Spent</div>
              <div className="text-[#0F172A]">$12,450</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="text-[#0D9488] mb-2">Member Since</div>
              <div className="text-[#0F172A]">
                {new Date(databaseUser.createdAt).toDateString()}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
