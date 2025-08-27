"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const AdminComingSoonPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="flex flex-col items-center justify-center py-24 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="mt-4 text-xl text-gray-600">Coming soon</p>
        <p className="mt-2 text-gray-500 max-w-md">
          We are working hard to bring powerful admin features. Please check
          back later.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700"
          >
            Go back home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminComingSoonPage;
