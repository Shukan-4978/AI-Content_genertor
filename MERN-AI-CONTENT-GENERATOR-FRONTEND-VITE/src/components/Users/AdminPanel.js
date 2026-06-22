import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllUsersAPI, toggleAdminAPI, deleteUserAPI } from "../../apis/user/usersAPI";
import StatusMessage from "../Alert/StatusMessage";
import { FaUserShield, FaUserPlus, FaTrash, FaUsers, FaChartPie, FaCreditCard } from "react-icons/fa";

export default function AdminPanel() {
  const queryClient = useQueryClient();

  // Query to get all users
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: getAllUsersAPI,
  });

  // Toggle Admin Mutation
  const toggleAdminMutation = useMutation({
    mutationFn: toggleAdminAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  // Delete User Mutation
  const deleteUserMutation = useMutation({
    mutationFn: deleteUserAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <StatusMessage type="loading" message="Loading admin database node..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 px-4">
        <StatusMessage type="error" message={error?.response?.data?.error || "Access Denied"} />
      </div>
    );
  }

  const users = data?.users || [];
  const totalUsers = users.length;
  const adminCount = users.filter((u) => u.isAdmin).length;
  const totalCreditUsed = users.reduce((sum, u) => sum + (u.apiRequestCount || 0), 0);
  const totalCreditLimit = users.reduce((sum, u) => sum + (u.monthlyRequestCount || 0), 0);

  const handleToggleAdmin = (userId) => {
    if (window.confirm("Are you sure you want to toggle admin status for this user?")) {
      toggleAdminMutation.mutate(userId);
    }
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("WARNING: This will permanently delete the user account. Proceed?")) {
      deleteUserMutation.mutate(userId);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 md:px-8 max-w-7xl mx-auto cyber-grid">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-wider flex items-center gap-3">
          <FaUserShield className="text-cyber-secondary animate-pulse" />
          SYSTEM <span className="bg-gradient-to-r from-cyber-secondary to-cyber-primary bg-clip-text text-transparent">ADMIN CORE</span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">Global monitoring console and user permissions grid</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="glass-panel rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyber-primary/10 rounded-full blur-xl" />
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyber-primary/10 border border-cyber-primary/30 flex items-center justify-center text-cyber-primary">
              <FaUsers className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-gray-400 block uppercase">Total Operators</span>
              <span className="text-2xl font-extrabold text-white">{totalUsers} Nodes</span>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyber-secondary/10 rounded-full blur-xl" />
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyber-secondary/10 border border-cyber-secondary/30 flex items-center justify-center text-cyber-secondary">
              <FaChartPie className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-gray-400 block uppercase">Credit core usage</span>
              <span className="text-2xl font-extrabold text-white">
                {totalCreditUsed} / {totalCreditLimit}
              </span>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-6 relative overflow-hidden sm:col-span-2 lg:col-span-1">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyber-accent/10 rounded-full blur-xl" />
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyber-accent/10 border border-cyber-accent/30 flex items-center justify-center text-cyber-accent">
              <FaUserShield className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-gray-400 block uppercase">Administrators</span>
              <span className="text-2xl font-extrabold text-white">{adminCount} Admins</span>
            </div>
          </div>
        </div>
      </div>

      {/* Users table */}
      <div className="glass-panel rounded-3xl p-6 md:p-8 overflow-hidden">
        <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-wider border-b border-white/5 pb-4">
          Registered Operators Console
        </h2>

        {users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-xs text-gray-400 uppercase tracking-widest">
                  <th className="py-4 px-4 font-semibold">Operator Info</th>
                  <th className="py-4 px-4 font-semibold">License Plan</th>
                  <th className="py-4 px-4 font-semibold">Credits Left / Used</th>
                  <th className="py-4 px-4 font-semibold">Security Role</th>
                  <th className="py-4 px-4 font-semibold">Registered</th>
                  <th className="py-4 px-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm text-gray-300">
                {users.map((user) => {
                  const creditsLeft = Math.max(0, user.monthlyRequestCount - user.apiRequestCount);
                  const isUserAdmin = user.isAdmin;

                  return (
                    <tr key={user._id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-bold text-white text-base">{user.username}</div>
                        <div className="text-xs text-gray-400 font-mono mt-0.5">{user.email}</div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold uppercase bg-cyber-primary/10 border border-cyber-primary/20 text-cyber-primary">
                          {user.subscriptionPlan}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-mono text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-cyber-secondary">{creditsLeft}</span>
                          <span className="text-gray-500">/</span>
                          <span className="text-gray-400">{user.apiRequestCount} used</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          isUserAdmin 
                            ? "bg-red-500/10 border border-red-500/30 text-red-400" 
                            : "bg-white/5 border border-white/10 text-gray-400"
                        }`}>
                          {isUserAdmin ? "Administrator" : "Standard User"}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-xs text-gray-400">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => handleToggleAdmin(user._id)}
                            className={`p-2 rounded-lg border transition-all ${
                              isUserAdmin
                                ? "bg-red-500/5 hover:bg-red-500/20 border-red-500/30 text-red-400"
                                : "bg-white/5 hover:bg-white/10 border-white/10 text-gray-300"
                            }`}
                            title={isUserAdmin ? "Revoke Admin Credentials" : "Grant Admin Credentials"}
                          >
                            <FaUserPlus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 transition-all"
                            title="Decommission Operator Node"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10 text-gray-400">
            No operators found in the registry database.
          </div>
        )}
      </div>
    </div>
  );
}
