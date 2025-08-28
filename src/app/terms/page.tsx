import React from "react";
import { FileText, Scale, AlertTriangle, CheckCircle, Clock, Shield } from "lucide-react";

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
                <Scale className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Please read these terms carefully before using our musical instrument rental services.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          
          {/* Acceptance of Terms */}
          <section>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Acceptance of Terms
              </h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                By accessing and using Loud-Mout-Music Rentals services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>
          </section>

          {/* Service Description */}
          <section>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Service Description
              </h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                Loud-Mout-Music Rentals provides musical instrument rental services, allowing customers to rent professional-quality instruments for various durations including daily, weekly, and monthly periods.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Professional musical instrument rentals</li>
                <li>Flexible rental periods (daily, weekly, monthly)</li>
                <li>Online booking and payment processing</li>
                <li>Delivery and pickup services</li>
                <li>Customer support and maintenance</li>
              </ul>
            </div>
          </section>

          {/* User Accounts */}
          <section>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                User Accounts
              </h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                To use our rental services, you must create an account and provide accurate, current, and complete information:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Valid email address and phone number</li>
                <li>Complete billing and shipping address</li>
                <li>Valid payment method information</li>
                <li>Government-issued identification for verification</li>
                <li>Agreement to these terms and conditions</li>
              </ul>
              <p>
                You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
              </p>
            </div>
          </section>

          {/* Rental Terms */}
          <section>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Rental Terms
              </h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <h3 className="text-lg font-semibold text-gray-900">Rental Periods</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Daily:</strong> Minimum 1 day rental</li>
                <li><strong>Weekly:</strong> 7-day rental period</li>
                <li><strong>Monthly:</strong> 30-day rental period</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-gray-900 mt-6">Pricing and Payment</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Rental fees are charged upfront for the entire rental period</li>
                <li>Security deposit may be required for high-value instruments</li>
                <li>Late return fees apply after the agreed rental period</li>
                <li>Payment is processed securely through Paystack</li>
                <li>All prices are in Nigerian Naira (NGN)</li>
              </ul>
            </div>
          </section>

          {/* Instrument Care and Return */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Instrument Care and Return
            </h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="text-lg font-semibold text-gray-900">During Rental</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Handle instruments with care and respect</li>
                <li>Store instruments in appropriate conditions</li>
                <li>Do not modify or repair instruments</li>
                <li>Report any damage or issues immediately</li>
                <li>Keep instruments in their cases when not in use</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-gray-900 mt-6">Return Requirements</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Return instruments in the same condition as received</li>
                <li>Clean instruments before return</li>
                <li>Return all accessories and cases</li>
                <li>Return on or before the agreed return date</li>
                <li>Inspect instruments upon return for any damage</li>
              </ul>
            </div>
          </section>

          {/* Damage and Liability */}
          <section>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Damage and Liability
              </h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                You are responsible for the care and condition of rented instruments during the rental period:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Normal Wear:</strong> Minor wear from normal use is expected</li>
                <li><strong>Damage:</strong> You are liable for damage beyond normal wear</li>
                <li><strong>Loss/Theft:</strong> You are responsible for lost or stolen instruments</li>
                <li><strong>Repairs:</strong> Do not attempt repairs - contact us immediately</li>
                <li><strong>Insurance:</strong> Consider additional insurance for valuable instruments</li>
              </ul>
            </div>
          </section>

          {/* Cancellation and Refunds */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Cancellation and Refunds
            </h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="text-lg font-semibold text-gray-900">Cancellation Policy</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Free cancellation up to 24 hours before rental start</li>
                <li>50% refund for cancellations within 24 hours</li>
                <li>No refunds for same-day cancellations</li>
                <li>Weather-related cancellations may be rescheduled</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-gray-900 mt-6">Refund Processing</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Refunds are processed within 5-7 business days</li>
                <li>Refunds are issued to the original payment method</li>
                <li>Processing fees may apply to certain payment methods</li>
              </ul>
            </div>
          </section>

          {/* Prohibited Uses */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Prohibited Uses
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                The following activities are strictly prohibited:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Using instruments for illegal activities</li>
                <li>Subletting or transferring instruments to third parties</li>
                <li>Modifying or disassembling instruments</li>
                <li>Using instruments in hazardous environments</li>
                <li>Commercial use without prior written permission</li>
                <li>Violating any applicable laws or regulations</li>
              </ul>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Limitation of Liability
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Loud-Mout-Music Rentals shall not be liable for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Indirect, incidental, or consequential damages</li>
                <li>Loss of profits, data, or business opportunities</li>
                <li>Personal injury or property damage</li>
                <li>Interruption of service or technical issues</li>
                <li>Acts of third parties or force majeure events</li>
              </ul>
              <p>
                Our total liability shall not exceed the amount paid for the rental period.
              </p>
            </div>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Termination
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We may terminate or suspend your account and rental privileges at any time for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Violation of these terms</li>
                <li>Non-payment of fees</li>
                <li>Fraudulent activity</li>
                <li>Abuse of our services</li>
                <li>Failure to return instruments on time</li>
              </ul>
            </div>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Governing Law
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                These terms shall be governed by and construed in accordance with the laws of Nigeria. Any disputes arising from these terms shall be resolved through arbitration in Lagos, Nigeria.
              </p>
            </div>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Changes to Terms
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of our services constitutes acceptance of the modified terms.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Contact Information
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> legal@loud-mout-music.com</p>
                <p><strong>Phone:</strong> +234 8146815186</p>
                <p><strong>Address:</strong> Paradise 2 estate, chevron Dr, Lekki, Lagos 101123</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
