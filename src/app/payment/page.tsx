"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/api";

const PaymentPage: React.FC = () => {
  const router = useRouter();
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
          amount: Number(amount),
          paymentMethod: "paystack",
          callbackUrl: `${window.location.origin}/payment/verify`,
        } as any);

        if ((init as any).authorization_url && (init as any).reference) {
          window.location.href = (init as any).authorization_url;
        } else if ((init as any).payment_url) {
          window.location.href = (init as any).payment_url;
        } else {
          setError("Failed to initialize payment");
        }
      } catch (e: any) {
        setError(e?.response?.data?.error || e.message || "Payment error");
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

export default PaymentPage;
