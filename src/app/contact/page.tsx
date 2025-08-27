"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Contact Info</h1>
        <div className="space-y-4 text-gray-700">
          <p>Paradise 2 estate, chevron Dr, Lekki, Lagos 101123</p>
          <p>+234 8146815186</p>
          <p>2gen2beatz@gmail.com</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;


