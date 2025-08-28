"use client";

import React, { useState, useEffect } from "react";
import { X, CreditCard, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import apiClient from "@/lib/api";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  instrument: {
    id: string;
    name: string;
    price?: number;
    image: string;
  };
  rentalDetails: {
    startDate: string;
    endDate: string;
    duration: number;
    durationType: string;
    totalAmount: number;
  };
}

interface PaystackConfig {
  key: string;
  email: string;
  amount: number;
  reference: string;
  callback: (response: PaystackResponse) => void;
  onClose: () => void;
}

interface PaystackResponse {
  status: string;
  reference: string;
  transaction: string;
}

declare global {
  interface Window {
    PaystackPop: {
      setup: (config: PaystackConfig) => {
        openIframe: () => void;
      };
    };
  }
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  instrument,
  rentalDetails,
}) => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "pending" | "success" | "failed"
  >("pending");
  const [error, setError] = useState<string | null>(null);
  const [paymentReference, setPaymentReference] = useState<string | null>(null);

  // Load Paystack script
  useEffect(() => {
    if (isOpen && !window.PaystackPop) {
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      script.onload = () => {
        console.log("Paystack script loaded");
      };
      document.body.appendChild(script);
    }
  }, [isOpen]);

  const initializePayment = async () => {
    // Double-check user authentication
    let currentUser = user;
    let currentToken = null;

    if (typeof window !== "undefined") {
      if (!currentUser) {
        try {
          const savedUser = localStorage.getItem("user");
          if (savedUser) {
            currentUser = JSON.parse(savedUser);
          }
        } catch (error) {
          console.error("Failed to parse saved user data:", error);
        }
      }
      currentToken = localStorage.getItem("token");
    }

    if (!currentUser || !currentToken) {
      setError("Please login to continue with payment");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create rental via API client (uses base URL and auth automatically)
      const rental = await apiClient.createRental({
        instrumentId: instrument.id,
        startDate: rentalDetails.startDate,
        endDate: rentalDetails.endDate,
        duration: rentalDetails.duration,
        durationType: rentalDetails.durationType,
        totalAmount: rentalDetails.totalAmount,
      } as any);

      // Initialize Paystack payment via API client
      const paymentData = await apiClient.initializePaystackPayment({
        rentalId: (rental as any)._id || (rental as any).id,
        email: (currentUser as any).email || user.email,
        amount: rentalDetails.totalAmount,
        callbackUrl: `${window.location.origin}/payment/verify`,
      });
      setPaymentReference(paymentData.reference);

      // Open Paystack payment modal
      if (window.PaystackPop) {
        const handler = window.PaystackPop.setup({
          key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_...",
          email: user.email,
          amount: paymentData.amount || rentalDetails.totalAmount * 100, // Convert to kobo
          reference: paymentData.reference,
          callback: async (response: PaystackResponse) => {
            if (response.status === "success") {
              setPaymentStatus("success");
              // Verify payment on backend
              await verifyPayment(paymentData.reference);
            } else {
              setPaymentStatus("failed");
              setError("Payment was not successful");
            }
          },
          onClose: () => {
            setPaymentStatus("failed");
            setError("Payment was cancelled");
          },
        });

        handler.openIframe();
      } else {
        // Fallback: redirect to Paystack URL
        if (paymentData.authorization_url) {
          window.location.href = paymentData.authorization_url;
        }
      }
    } catch (err: unknown) {
      console.error("Payment initialization error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to initialize payment"
      );
      setPaymentStatus("failed");
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async (reference: string) => {
    try {
      const result = await apiClient.verifyPaystackPayment(reference);
      if ((result as any).success !== false) {
        setPaymentStatus("success");
        setTimeout(() => {
          onClose();
          window.location.href = "/rentals";
        }, 2000);
      } else {
        setPaymentStatus("failed");
      }
    } catch (err) {
      console.error("Payment verification error:", err);
      setPaymentStatus("failed");
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Complete Payment
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {paymentStatus === "pending" && (
            <>
              {/* Instrument Details */}
              <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <img
                  src={instrument.image}
                  alt={instrument.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {instrument.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {rentalDetails.duration} {rentalDetails.durationType}
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(rentalDetails.startDate).toLocaleDateString()} -{" "}
                    {new Date(rentalDetails.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">
                  Payment Summary
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Rental Fee:</span>
                    <span>{formatCurrency(rentalDetails.totalAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Security Deposit:</span>
                    <span>
                      {formatCurrency(rentalDetails.totalAmount * 0.2)}
                    </span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total Amount:</span>
                      <span>
                        {formatCurrency(rentalDetails.totalAmount * 1.2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              <button
                onClick={initializePayment}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="h-5 w-5" />
                    <span>Pay with Paystack</span>
                  </>
                )}
              </button>

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2 text-red-700">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">{error}</span>
                  </div>
                </div>
              )}
            </>
          )}

          {paymentStatus === "success" && (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Payment Successful!
              </h3>
              <p className="text-gray-600 mb-4">
                Your rental has been confirmed. You will receive a confirmation
                email shortly.
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-700">
                  Reference: {paymentReference}
                </p>
              </div>
            </div>
          )}

          {paymentStatus === "failed" && (
            <div className="text-center py-8">
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Payment Failed
              </h3>
              <p className="text-gray-600 mb-4">
                {error ||
                  "Something went wrong with your payment. Please try again."}
              </p>
              <button
                onClick={() => {
                  setPaymentStatus("pending");
                  setError(null);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
