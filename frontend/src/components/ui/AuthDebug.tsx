"use client";

import React from "react";
import { useAuth } from "@/lib/auth-context";

const AuthDebug: React.FC = () => {
  const { user, loading } = useAuth();

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs max-w-xs z-50">
      <h4 className="font-bold mb-2">Auth Debug Info</h4>
      <div className="space-y-1">
        <p>
          <strong>Loading:</strong> {loading ? "Yes" : "No"}
        </p>
        <p>
          <strong>User:</strong> {user ? "Logged In" : "Not Logged In"}
        </p>
        {user && (
          <>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
          </>
        )}
        <p>
          <strong>Token:</strong>{" "}
          {typeof window !== "undefined" && localStorage.getItem("token")
            ? "Present"
            : "Missing"}
        </p>
        <p>
          <strong>User Data:</strong>{" "}
          {typeof window !== "undefined" && localStorage.getItem("user")
            ? "Present"
            : "Missing"}
        </p>
      </div>
    </div>
  );
};

export default AuthDebug;
