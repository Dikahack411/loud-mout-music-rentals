"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          About Us
        </h1>
        <p className="text-gray-700">
          We provide high-quality musical instrument rentals with flexible plans
          and exceptional support. Visit our contact page for inquiries or
          bookings.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
