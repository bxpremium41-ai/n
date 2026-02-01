import { PricingPlan } from "../types";

// REPLACE THIS WITH YOUR ACTUAL RAZORPAY KEY ID FROM DASHBOARD
const RAZORPAY_KEY_ID = 'YOUR_RAZORPAY_KEY_ID'; 

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id?: string; // Optional for client-side testing, required for production security
  handler: (response: any) => void;
  prefill: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: {
    address?: string;
  };
  theme: {
    color: string;
  };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => any;
  }
}

export const openRazorpayCheckout = (
  plan: PricingPlan, 
  phoneNumber: string,
  onSuccess: (paymentId: string) => void,
  onFailure: (error: any) => void
) => {
  if (!window.Razorpay) {
    alert('Razorpay SDK failed to load. Please check your internet connection.');
    onFailure('SDK_NOT_LOADED');
    return;
  }

  // Convert price string (e.g., "$49" or "₹599") to minor units (cents/paise)
  const numericPrice = parseInt(plan.price.replace(/[^0-9]/g, ''), 10);
  const amountInMinorUnits = numericPrice * 100;

  const options: RazorpayOptions = {
    key: RAZORPAY_KEY_ID, 
    amount: amountInMinorUnits, 
    currency: "USD", // Updated to USD as per request
    name: "Avada",
    description: `${plan.duration} All-Access Subscription`,
    image: "https://via.placeholder.com/150/7C3AED/FFFFFF?text=AV", // Replace with your actual logo URL
    handler: function (response: any) {
      // In a real app, you would verify the signature on your backend here
      console.log("Payment Successful", response);
      onSuccess(response.razorpay_payment_id);
    },
    prefill: {
      contact: phoneNumber,
      name: "Avada Student", // You could ask for this in the form too
      email: "student@example.com"
    },
    theme: {
      color: "#D90429" // Matches brand-primary red
    }
  };

  try {
    const rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response: any){
      console.error("Payment Failed", response.error);
      onFailure(response.error);
    });
    rzp1.open();
  } catch (error) {
    console.error("Razorpay Error", error);
    onFailure(error);
  }
};
