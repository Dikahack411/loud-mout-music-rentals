"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/lib/api";

const VerifyPaymentPage: React.FC = () => {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<string>("verifying");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const verify = async () => {
      const reference = searchParams.get("reference");
      if (!reference) {
        setStatus("error");
        setMessage("Missing reference");
        return;
      }
      try {
        const res = await api.verifyPaystackPayment(reference as string);
        setStatus("success");
        setMessage("Payment verified successfully");
      } catch (e: any) {
        setStatus("error");
        setMessage(e?.response?.data?.error || e.message || "Verification failed");
      }
    };
    verify();
  }, [searchParams]);

  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      {status === "verifying" && <h1>Verifying payment...</h1>}
      {status === "success" && <h1>Payment Successful</h1>}
      {status === "error" && <h1>Payment Verification Failed</h1>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default VerifyPaymentPage;


