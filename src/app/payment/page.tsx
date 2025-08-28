"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/lib/api";

const PaymentPageContent: React.FC = () => {
  // const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const rentalId = searchParams.get("rentalId");
  const amount = searchParams.get("amount");

  useEffect(() => {
    const start = async () => {
      try {
        if (!rentalId || !amount) {
          setError("Missing rentalId or amount");
          return;
        }

        const init = await api.initializePaystackPayment({
          rentalId,
          email: "user@example.com", // TODO: Get actual user email
          amount: Number(amount),
          callbackUrl: `${window.location.origin}/payment/verify`,
        });

        if (init.authorization_url && init.reference) {
          window.location.href = init.authorization_url;
        } else if (init.payment_url) {
          window.location.href = init.payment_url;
        } else {
          setError("Failed to initialize payment");
        }
      } catch (e: unknown) {
        const error = e as {
          response?: { data?: { error?: string } };
          message?: string;
        };
        setError(
          error?.response?.data?.error || error?.message || "Payment error"
        );
      }
    };
    start();
  }, [rentalId, amount]);

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "4rem" }}>
        <h1>Payment Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h1>Redirecting to payment...</h1>
      <p>Please wait.</p>
    </div>
  );
};

const PaymentPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentPageContent />
    </Suspense>
  );
};

export default PaymentPage;
