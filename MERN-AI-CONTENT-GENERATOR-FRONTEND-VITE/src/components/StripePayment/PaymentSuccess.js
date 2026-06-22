import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { verifyRazorpayPaymentAPI } from "../../apis/razorpayPayment/razorpayPayment";
import StatusMessage from "../Alert/StatusMessage";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const paymentIntentID = searchParams.get("payment_intent");
  const orderId = searchParams.get("order_id");
  const signature = searchParams.get("signature");
  const plan = searchParams.get("plan");

  const { isLoading, isError, error } = useQuery({
    queryKey: ["verifyPayment", paymentIntentID],
    queryFn: () =>
      verifyRazorpayPaymentAPI({
        razorpay_payment_id: paymentIntentID,
        razorpay_order_id: orderId,
        razorpay_signature: signature,
        subscriptionPlan: plan,
      }),
    enabled: !!paymentIntentID && !!orderId && !!signature && !!plan,
  });

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 flex justify-center items-center cyber-grid">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyber-primary/10 rounded-full blur-3xl" />

      <div className="glass-panel-glow rounded-3xl max-w-md w-full p-8 relative z-10 text-center">
        {isLoading ? (
          <div className="py-6">
            <StatusMessage type="loading" message="Verifying transaction signature..." />
          </div>
        ) : isError ? (
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mx-auto mb-6">
              <FaTimesCircle className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-extrabold text-white mb-2 uppercase tracking-wider">
              Verification Failed
            </h1>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              {error?.response?.data?.message || "An issue occurred verifying your Razorpay payment. Please contact support."}
            </p>
            <Link
              to="/plans"
              className="inline-block rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold py-2.5 px-6 text-xs uppercase tracking-wider transition-all duration-300"
            >
              Back to Pricing
            </Link>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 mx-auto mb-6 animate-pulse">
              <FaCheckCircle className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-extrabold text-white mb-2 uppercase tracking-wider">
              License Activated
            </h1>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Thank you! Your GEN.AI license ({plan} tier) is active. <br />
              Transaction node: <span className="font-semibold text-cyber-secondary break-all">{paymentIntentID}</span>
            </p>
            <Link
              to="/generate-content"
              className="inline-block rounded-xl bg-gradient-to-r from-cyber-primary to-cyber-accent text-white font-bold py-3 px-6 text-xs uppercase tracking-widest transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/20"
            >
              Start Generating Content
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
