import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getUserProfileAPI } from "../../apis/user/usersAPI";
import StatusMessage from "../Alert/StatusMessage";

const Dashboard = () => {
  // get user profile
  const { isLoading, isError, data, error } = useQuery({
    queryFn: getUserProfileAPI,
    queryKey: ["profile"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <StatusMessage type="loading" message="Syncing console dashboard..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 px-4">
        <StatusMessage type="error" message={error?.response?.data?.message || "Failed to load dashboard"} />
      </div>
    );
  }

  const user = data?.user;
  const creditLimit = user?.monthlyRequestCount || 0;
  const creditUsed = user?.apiRequestCount || 0;
  const creditsLeft = Math.max(0, creditLimit - creditUsed);
  const creditPercent = creditLimit > 0 ? Math.min(100, (creditUsed / creditLimit) * 100) : 0;

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 md:px-8 max-w-7xl mx-auto cyber-grid">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-wider">
            OPERATOR <span className="bg-gradient-to-r from-cyber-secondary to-cyber-primary bg-clip-text text-transparent">DASHBOARD</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">Manage credentials, plans, and generation nodes</p>
        </div>
        <Link
          to="/generate-content"
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyber-primary to-cyber-accent px-6 py-3 text-sm font-bold text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300"
        >
          Initialize Generator
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {/* Profile Card */}
        <div className="glass-panel rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyber-primary/10 rounded-full blur-xl" />
          <h2 className="text-lg font-bold text-white mb-6 uppercase tracking-wider border-b border-white/5 pb-2">
            System Operator
          </h2>
          <div className="space-y-4">
            <div>
              <span className="text-xs text-gray-400 block uppercase">Username</span>
              <span className="text-base font-semibold text-white">{user?.username}</span>
            </div>
            <div>
              <span className="text-xs text-gray-400 block uppercase">Key Node Address</span>
              <span className="text-base font-semibold text-white break-all">{user?.email}</span>
            </div>
          </div>
        </div>

        {/* Credits usage card */}
        <div className="glass-panel rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyber-secondary/10 rounded-full blur-xl" />
          <h2 className="text-lg font-bold text-white mb-6 uppercase tracking-wider border-b border-white/5 pb-2">
            Credit Core Usage
          </h2>
          <div>
            <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
              <span>USAGE BAR</span>
              <span className="font-bold text-white">{creditUsed} / {creditLimit} Requests</span>
            </div>
            <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden mb-6">
              <div 
                className="h-full bg-gradient-to-r from-cyber-secondary to-cyber-primary rounded-full transition-all duration-500"
                style={{ width: `${creditPercent}%` }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-gray-400 block uppercase">Remaining</span>
                <span className="text-lg font-bold text-cyber-secondary">{creditsLeft}</span>
              </div>
              <div>
                <span className="text-xs text-gray-400 block uppercase">Next Cycle</span>
                <span className="text-sm font-semibold text-white break-all">
                  {user?.nextBillingDate ? new Date(user?.nextBillingDate).toLocaleDateString() : "Active Cycle"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Plan status card */}
        <div className="glass-panel rounded-3xl p-6 relative overflow-hidden md:col-span-2 lg:col-span-1">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyber-accent/10 rounded-full blur-xl" />
          <h2 className="text-lg font-bold text-white mb-6 uppercase tracking-wider border-b border-white/5 pb-2">
            Subscribed Node Tier
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-400 block uppercase">Current Plan</span>
                <span className="text-xl font-bold bg-gradient-to-r from-cyber-primary to-cyber-accent bg-clip-text text-transparent uppercase">
                  {user?.subscriptionPlan}
                </span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                user?.trialActive ? "bg-green-500/10 border border-green-500/30 text-green-400 animate-pulse" : "bg-white/5 border border-white/10 text-gray-300"
              }`}>
                {user?.trialActive ? "Trial Active" : "Standard License"}
              </span>
            </div>
            <div>
              <span className="text-xs text-gray-400 block uppercase">Trial Expires</span>
              <span className="text-sm font-semibold text-white">
                {user?.trialExpires ? new Date(user?.trialExpires).toDateString() : "Never"}
              </span>
            </div>
            <div className="pt-2">
              <Link
                to="/plans"
                className="w-full text-center block rounded-xl border border-cyber-primary/30 bg-cyber-primary/5 hover:bg-cyber-primary/10 text-white font-bold py-2 text-xs uppercase tracking-wider transition-all duration-300"
              >
                Modify Core Plan
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Payment History section */}
      <div className="glass-panel rounded-3xl p-8 overflow-hidden">
        <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-wider border-b border-white/5 pb-4">
          Payment Transactions
        </h2>
        {user?.payments?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-xs text-gray-400 uppercase tracking-widest">
                  <th className="py-4 px-4 font-semibold">Cycle Plan</th>
                  <th className="py-4 px-4 font-semibold">Date Initialized</th>
                  <th className="py-4 px-4 font-semibold">Status State</th>
                  <th className="py-4 px-4 font-semibold text-right">Cost (USD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm text-gray-300">
                {user?.payments?.map((payment) => (
                  <tr key={payment?._id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 font-bold text-white uppercase">{payment?.subscriptionPlan}</td>
                    <td className="py-4 px-4 text-gray-400">{new Date(payment?.createdAt).toLocaleDateString()}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                        payment?.status === "succeeded" 
                          ? "bg-green-500/10 border-green-500/30 text-green-400" 
                          : "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
                      }`}>
                        {payment?.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-semibold text-white">$ {payment?.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10 text-gray-400">
            No transaction records found on this account.
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
