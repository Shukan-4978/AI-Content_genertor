import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createRazorpayOrderAPI } from "../../apis/razorpayPayment/razorpayPayment";
import StatusMessage from "../Alert/StatusMessage";
import { FaCreditCard, FaLock, FaTerminal } from "react-icons/fa";

const CheckoutForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const plan = params.plan;
  const amount = searchParams.get("amount");
  const [errorMessage, setErrorMessage] = useState(null);
  
  // State for simulated payment terminal (fallback)
  const [showMockModal, setShowMockModal] = useState(false);
  const [mockOrderData, setMockOrderData] = useState(null);

  const mutation = useMutation({
    mutationFn: createRazorpayOrderAPI,
  });

  // Load Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    // Call API to create order (backend will tell us if we are simulating)
    mutation.mutate(
      { amount, plan },
      {
        onSuccess: async (data) => {
          if (data.isMock) {
            setMockOrderData(data);
            setShowMockModal(true);
            return;
          }

          const scriptLoaded = await loadRazorpayScript();
          if (!scriptLoaded) {
            setErrorMessage("Failed to load Razorpay payment gateway. Please check your internet connection.");
            return;
          }

          const options = {
            key: data.key,
            amount: data.amount,
            currency: data.currency,
            name: "GEN.AI Core",
            description: `License subscription to ${plan} Tier`,
            order_id: data.id,
            handler: function (response) {
              navigate(
                `/success?payment_intent=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id}&signature=${response.razorpay_signature}&plan=${plan}`
              );
            },
            prefill: {
              name: "",
              email: "",
              contact: "",
            },
            theme: {
              color: "#9333EA",
            },
          };

          const rzp = new window.Razorpay(options);
          rzp.open();
        },
        onError: (error) => {
          setErrorMessage(error?.response?.data?.error || "Failed to initiate transaction");
        },
      }
    );
  };

  const handleSimulatedSuccess = () => {
    const mockPaymentId = "pay_mock_" + Math.random().toString(36).substring(7);
    const mockSignature = "sig_mock_" + Math.random().toString(36).substring(10);
    navigate(
      `/success?payment_intent=${mockPaymentId}&order_id=${mockOrderData.id}&signature=${mockSignature}&plan=${plan}`
    );
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 flex justify-center items-center cyber-grid">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyber-primary/10 rounded-full blur-3xl" />
      
      <div className="glass-panel-glow rounded-3xl max-w-md w-full p-8 relative z-10 text-center">
        {!showMockModal ? (
          <>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyber-primary to-cyber-accent flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-purple-500/20">
              <FaCreditCard className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-extrabold text-white mb-2 uppercase tracking-wider">
              Secure Payment
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              Initialize transaction core for license tier activation
            </p>

            {/* Plan summary block */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-gray-400 uppercase">Selected License:</span>
                <span className="text-sm font-bold text-cyber-secondary uppercase">{plan}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-white/5">
                <span className="text-xs text-gray-400 uppercase">Amount Due:</span>
                <span className="text-2xl font-extrabold text-white">₹{Number(amount).toLocaleString()} INR</span>
              </div>
            </div>

            {mutation.isPending && (
              <StatusMessage type="loading" message="Initializing transaction node..." />
            )}

            <button
              onClick={handlePayment}
              disabled={mutation.isPending}
              className="w-full py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-cyber-primary to-cyber-accent shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 uppercase tracking-widest"
            >
              Pay with Razorpay
            </button>

            {errorMessage && (
              <div className="text-red-400 text-sm mt-4 font-semibold">{errorMessage}</div>
            )}
          </>
        ) : (
          // Simulated Sandbox payment dialog
          <div className="animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400 mx-auto mb-6">
              <FaTerminal className="w-8 h-8 animate-pulse" />
            </div>

            <h2 className="text-2xl font-extrabold text-white mb-2 uppercase tracking-wider">
              SANDBOX TERMINAL
            </h2>
            <p className="text-sm text-yellow-400 mb-6 flex items-center justify-center gap-1.5 font-semibold">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
              Simulating Transaction Environment
            </p>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left space-y-4">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400 uppercase">License Order:</span>
                <span className="font-mono text-white">{mockOrderData?.id}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400 uppercase">Simulated Sum:</span>
                <span className="font-mono text-green-400">Rs {(mockOrderData?.amount / 100).toFixed(2)} INR</span>
              </div>
              <div className="pt-4 border-t border-white/5 text-[11px] text-gray-400 flex items-start gap-2 leading-relaxed">
                <FaLock className="shrink-0 text-cyber-secondary mt-0.5" />
                <span>The backend is running without API credentials. Click the button below to authorize a successful mock payment.</span>
              </div>
            </div>

            <button
              onClick={handleSimulatedSuccess}
              className="w-full py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/10 hover:shadow-green-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 uppercase tracking-widest"
            >
              Simulate Success Pay
            </button>
            
            <button
              onClick={() => setShowMockModal(false)}
              className="w-full py-2.5 mt-3 rounded-xl text-xs font-semibold text-gray-400 hover:text-white transition-colors"
            >
              Cancel Transaction
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;
