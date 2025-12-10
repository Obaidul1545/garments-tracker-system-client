import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Ban, CheckCircle, Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { FaUserEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const [updatedRole, setUpdatedRole] = useState('');

  const {
    data: databaseUser = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['users', search, role],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all-users?search=${search}&role=${role}`
      );
      return res.data;
    },
  });

  // role update
  const openRoleModal = (user) => {
    setSelectedUser(user);
    setUpdatedRole(user.role);
    setIsOpen(true);
  };

  const handleRoleUpdate = async () => {
    try {
      await axiosSecure.patch('/update-user', {
        email: selectedUser.email,
        role: updatedRole,
      });
      toast.success('Role Updated!');
      refetch();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      closeModal();
    }
  };

  // Acount Status Update
  const openStatusModal = (user) => {
    setSelectedUser(user);
    setupdatedStatus(user.accountStatus);
    setStatusIsOpen(true);
  };
  let [isStatusOpen, setStatusIsOpen] = useState(false);
  const closeStatusModal = () => setStatusIsOpen(false);
  const [updatedStatus, setupdatedStatus] = useState(
    databaseUser?.accountStatus
  );
  const handleAcountStatusUpdate = async () => {
    try {
      await axiosSecure.patch('/update-user', {
        email: selectedUser.email,
        accountStatus: updatedStatus,
      });
      toast.success('Account Status Updated!');
      refetch();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      closeStatusModal();
    }
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div>
      <div className="space-y-6 px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-[#0F172A] text-3xl font-semibold mb-2">
              Manage Users
            </h1>
            <p className="text-[#475569]">View and manage all platform users</p>
          </div>
        </div>

        {/* Search user */}
        <div className="bg-white rounded-md p-6 shadow-md flex flex-col md:flex-row justify-between items-center">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#475569]" />
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search user..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0D9488] focus:border-transparent outline-none transition-all"
            />
          </div>
          <div className="max-w-md mt-4 flex gap-4">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0D9488] outline-none"
            >
              <option value="all">All Roles</option>
              <option value="buyer">Buyer</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-md shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#E2E8F0]">
                <tr>
                  <th className="px-6 py-4 text-left text-[#0F172A]">Name</th>
                  <th className="px-6 py-4 text-left text-[#0F172A]">Email</th>
                  <th className="px-6 py-4 text-left text-[#0F172A]">Role</th>
                  <th className="px-6 py-4 text-left text-[#0F172A]">Status</th>
                  <th className="px-6 py-4 text-left text-[#0F172A]">
                    Join Date
                  </th>
                  <th className="px-6 py-4 text-left text-[#0F172A]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {databaseUser.map((user, index) => (
                  <motion.tr
                    key={user._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="text-[#475569]">{user.displayName}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[#475569]">{user.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-700">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full ${
                          user.accountStatus === 'active'
                            ? 'bg-green-100 text-green-700'
                            : user.accountStatus === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {user.accountStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[#475569]">
                        {new Date(user.createdAt).toDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {user.accountStatus === 'suspended' ? (
                          <button
                            onClick={() => openStatusModal(user)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors cursor-pointer"
                            title="Activate User"
                          >
                            <CheckCircle size={20} />
                          </button>
                        ) : (
                          <button
                            onClick={() => openStatusModal(user)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Suspend User"
                          >
                            <Ban size={20} />
                          </button>
                        )}
                        <button
                          onClick={() => openRoleModal(user)}
                          className="text-[#0D9488] hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit User"
                        >
                          <FaUserEdit size={20} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {databaseUser.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#475569]">No users found</p>
            </div>
          )}
        </div>
      </div>

      {/* role update modal */}
      <dialog
        open={isOpen}
        className="relative z-50 focus:outline-none modal modal-bottom sm:modal-middle"
        onClose={closeModal}
      >
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            transition
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-gray-200
      duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <h3 className="text-xl text-[#0F172A]  font-semibold  mb-4">
              Update User Role
            </h3>

            {/* Role Select */}
            <div className="mb-6">
              <label className="block mb-2 text-[#475569] text-sm font-medium">
                Select Role
              </label>

              <select
                value={updatedRole}
                onChange={(e) => setUpdatedRole(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-3 
          focus:ring-2 focus:ring-[#0D9488] outline-none"
              >
                <option value="buyer">Buyer</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 rounded-xl border border-gray-300 text-[#475569] 
          hover:bg-gray-100 transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleRoleUpdate}
                className="px-4 py-2 rounded-xl bg-[#0D9488] text-white 
          hover:bg-[#0b8177] transition cursor-pointer"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </dialog>

      {/* user accountStatus modal */}
      <dialog
        open={isStatusOpen}
        className="relative z-50 focus:outline-none modal modal-bottom sm:modal-middle"
        onClose={closeModal}
      >
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            transition
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-gray-200
      duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <h3 className="text-xl text-[#0F172A]  font-semibold  mb-4">
              Update User Account Status
            </h3>

            {/* Role Select */}
            <div className="mb-6">
              <label className="block mb-2 text-[#475569] text-sm font-medium">
                Account Status
              </label>

              <select
                value={updatedStatus}
                onChange={(e) => setupdatedStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-3 
          focus:ring-2 focus:ring-[#0D9488] outline-none"
              >
                <option value="Active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={closeStatusModal}
                className="px-4 py-2 rounded-xl border border-gray-300 text-[#475569] 
          hover:bg-gray-100 transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleAcountStatusUpdate}
                className="px-4 py-2 rounded-xl bg-[#0D9488] text-white 
          hover:bg-[#0b8177] transition cursor-pointer"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </dialog>

      {/* Suspend Modal
      {showSuspendModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[#0F172A]">Suspend User</h2>
              <button
                onClick={() => {
                  setShowSuspendModal(false);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-3">
              <button
                // onClick={() => {
                //   setShowSuspendModal(false);
                //   setSelectedUser(null);
                //   setSuspendReason('');
                // }}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-[#475569] rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                // onClick={handleSuspend}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
              >
                Suspend User
              </button>
            </div>
          </motion.div>
        </div>
      )} */}
    </div>
  );
};

export default ManageUsers;
