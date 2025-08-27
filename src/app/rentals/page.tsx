"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const RentalsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-5xl mx-auto py-16 px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Your Rentals</h1>
        <p className="mt-2 text-gray-600">No rentals found yet.</p>

        <div className="mt-8">
          <Link
            href="/instruments"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700"
          >
            Browse instruments
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RentalsPage;
