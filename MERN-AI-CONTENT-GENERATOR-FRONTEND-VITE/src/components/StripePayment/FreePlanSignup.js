import { useMutation } from "@tanstack/react-query";
import React from "react";
import { handleFreeSubscriptionAPI } from "../../apis/razorpayPayment/razorpayPayment";
import StatusMessage from "../Alert/StatusMessage";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const FreePlanSignup = () => {
  const planDetails = {
    name: "Free",
    price: "$0.00 / month",
    features: ["5 Credits", "1 User Console Access", "Standard Core Nodes"],
  };

  const mutation = useMutation({ mutationFn: handleFreeSubscriptionAPI });
  
  const handleConfirmClick = () => {
    mutation.mutate();
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 flex justify-center items-center cyber-grid">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyber-primary/10 rounded-full blur-3xl" />

      <div className="glass-panel-glow rounded-3xl max-w-md w-full p-8 relative z-10 text-center">
        <h2 className="text-2xl font-extrabold text-white mb-2 uppercase tracking-wider">
          Activate {planDetails.name} License
        </h2>
        <p className="text-sm text-gray-400 mb-6 leading-relaxed">
          Unlock core neural processing with standard limitations
        </p>

        {/* Status Messages */}
        {mutation?.isError && (
          <StatusMessage
            type="error"
            message={mutation?.error?.response?.data?.error || "Subscription upgrade failed"}
          />
        )}
        {mutation?.isPending && (
          <StatusMessage type="loading" message="Configuring subscription node..." />
        )}
        {mutation?.isSuccess && (
          <StatusMessage type="success" message="Free tier license initialized!" />
        )}

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 text-left space-y-4">
          <ul className="space-y-3">
            {planDetails.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-secondary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <div className="pt-4 border-t border-white/5 flex justify-between items-center">
            <span className="text-xs text-gray-400 uppercase">License Cost:</span>
            <span className="text-lg font-extrabold text-green-400">{planDetails.price}</span>
          </div>
        </div>

        {mutation?.isSuccess ? (
          <Link
            to="/dashboard"
            className="w-full text-center block py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-cyber-primary to-cyber-accent shadow-lg shadow-purple-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 uppercase tracking-widest"
          >
            Access Dashboard
          </Link>
        ) : (
          <button
            onClick={handleConfirmClick}
            disabled={mutation.isPending}
            className="w-full py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-cyber-primary to-cyber-accent shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 uppercase tracking-widest"
          >
            Confirm Free License
          </button>
        )}
      </div>
    </div>
  );
};

export default FreePlanSignup;
