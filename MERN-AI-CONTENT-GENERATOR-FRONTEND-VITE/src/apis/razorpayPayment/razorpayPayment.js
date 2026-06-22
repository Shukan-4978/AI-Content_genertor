import axios from "axios";

// Free Subscription
export const handleFreeSubscriptionAPI = async () => {
  const response = await axios.post(
    "http://localhost:8090/api/v1/razorpay/free-plan",
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
    "http://localhost:8090/api/v1/razorpay/checkout",
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
    "http://localhost:8090/api/v1/razorpay/verify",
    verificationData,
    {
      withCredentials: true,
    }
  );
  return response?.data;
};
