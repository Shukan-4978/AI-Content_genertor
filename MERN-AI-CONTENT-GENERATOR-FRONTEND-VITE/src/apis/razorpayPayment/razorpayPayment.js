import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "https://gen-ai-backend.onrender.com";

// Free Subscription
export const handleFreeSubscriptionAPI = async () => {
  const response = await axios.post(
    `${BASE_URL}/api/v1/razorpay/free-plan`,
    {},
    {
      withCredentials: true,
    }
  );
  return response?.data;
};

// Create Razorpay Order
export const createRazorpayOrderAPI = async (payment) => {
  const response = await axios.post(
    `${BASE_URL}/api/v1/razorpay/checkout`,
    {
      amount: Number(payment?.amount),
      subscriptionPlan: payment?.plan,
    },
    {
      withCredentials: true,
    }
  );
  return response?.data;
};

// Verify Razorpay Payment
export const verifyRazorpayPaymentAPI = async (verificationData) => {
  const response = await axios.post(
    `${BASE_URL}/api/v1/razorpay/verify`,
    verificationData,
    {
      withCredentials: true,
    }
  );
  return response?.data;
};
