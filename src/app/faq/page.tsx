"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, Music, CreditCard, Truck, Clock, Shield } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQPage = () => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const faqData: FAQItem[] = [
    // General Questions
    {
      question: "What is Loud-Mout-Music Rentals?",
      answer: "Loud-Mout-Music Rentals is a premier musical instrument rental service that allows musicians to rent professional-quality instruments without the commitment of ownership. We offer a wide variety of instruments for daily, weekly, and monthly rentals.",
      category: "general"
    },
    {
      question: "How does the rental process work?",
      answer: "The rental process is simple: 1) Browse our instrument catalog, 2) Select your desired instrument and rental period, 3) Complete the booking and payment, 4) Pick up your instrument or arrange delivery, 5) Return the instrument on the agreed date.",
      category: "general"
    },
    {
      question: "What types of instruments do you offer?",
      answer: "We offer a comprehensive range of instruments including string instruments (guitars, violins, cellos), keyboard instruments (pianos, synthesizers), percussion instruments (drums, cymbals), and electronic equipment (microphones, amplifiers, mixers).",
      category: "general"
    },
    {
      question: "Do you offer delivery and pickup services?",
      answer: "Yes, we offer both delivery and pickup services for your convenience. Delivery is available within Lagos and surrounding areas. Pickup is available at our main location in Paradise 2 estate, Chevron Dr, Lekki.",
      category: "general"
    },

    // Booking and Reservations
    {
      question: "How far in advance should I book an instrument?",
      answer: "We recommend booking at least 24-48 hours in advance, especially for popular instruments or during peak seasons. For special events or long-term rentals, we suggest booking 1-2 weeks ahead.",
      category: "booking"
    },
    {
      question: "Can I extend my rental period?",
      answer: "Yes, you can extend your rental period subject to availability. Contact us at least 24 hours before your current rental ends to request an extension. Additional fees will apply for the extended period.",
      category: "booking"
    },
    {
      question: "What is your cancellation policy?",
      answer: "Free cancellation up to 24 hours before rental start, 50% refund for cancellations within 24 hours, and no refunds for same-day cancellations. Weather-related cancellations may be rescheduled.",
      category: "booking"
    },
    {
      question: "Can I reserve multiple instruments?",
      answer: "Yes, you can rent multiple instruments at once. Each instrument will have its own rental agreement and return date. We offer discounts for multiple instrument rentals.",
      category: "booking"
    },

    // Pricing and Payment
    {
      question: "What are your rental rates?",
      answer: "Our rental rates vary by instrument type and rental duration. Daily rates start from ₦1,500, weekly rates from ₦8,000, and monthly rates from ₦25,000. Premium instruments may have higher rates.",
      category: "pricing"
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, and bank transfers through our secure Paystack payment gateway. Payment is required upfront for the entire rental period.",
      category: "pricing"
    },
    {
      question: "Do you require a security deposit?",
      answer: "Security deposits may be required for high-value instruments. The deposit amount varies by instrument and is refunded upon safe return of the instrument in good condition.",
      category: "pricing"
    },
    {
      question: "Are there any hidden fees?",
      answer: "No hidden fees! Our pricing is transparent and includes the rental fee, basic insurance, and standard maintenance. Additional charges only apply for late returns, damage, or optional services like delivery.",
      category: "pricing"
    },

    // Instrument Care and Return
    {
      question: "How should I care for the rented instrument?",
      answer: "Handle instruments with care, store them in appropriate conditions, keep them in cases when not in use, avoid extreme temperatures and humidity, and report any issues immediately. Normal wear from playing is expected.",
      category: "care"
    },
    {
      question: "What happens if I damage an instrument?",
      answer: "Report any damage immediately. Minor wear from normal use is expected, but you are responsible for damage beyond normal wear. We'll assess the damage and may charge repair costs or replacement fees.",
      category: "care"
    },
    {
      question: "What should I do if an instrument is lost or stolen?",
      answer: "Contact us immediately if an instrument is lost or stolen. You are responsible for lost or stolen instruments. We recommend checking your insurance coverage and may require a police report.",
      category: "care"
    },
    {
      question: "Can I have the instrument tuned or serviced?",
      answer: "Instruments are delivered in good playing condition. If you need tuning or minor adjustments, please contact us. Do not attempt repairs yourself as this may void the rental agreement.",
      category: "care"
    },

    // Technical Support
    {
      question: "What if I have technical issues with an instrument?",
      answer: "Contact our technical support team immediately. We'll troubleshoot the issue and may provide a replacement instrument if needed. Do not attempt repairs yourself.",
      category: "technical"
    },
    {
      question: "Do you provide instrument lessons or tutorials?",
      answer: "While we don't provide formal lessons, our team can offer basic guidance on instrument setup and care. We recommend consulting with qualified music teachers for proper instruction.",
      category: "technical"
    },
    {
      question: "Can I test an instrument before renting?",
      answer: "Yes, you can test instruments at our location before making a rental decision. We encourage this to ensure you're comfortable with the instrument and it meets your needs.",
      category: "technical"
    },
    {
      question: "What accessories are included with rentals?",
      answer: "Basic accessories like cases, stands, and cables are included with most rentals. Premium accessories may be available for an additional fee. Check the instrument details for specific inclusions.",
      category: "technical"
    }
  ];

  const categories = [
    { id: "all", name: "All Questions", icon: HelpCircle },
    { id: "general", name: "General", icon: Music },
    { id: "booking", name: "Booking", icon: Clock },
    { id: "pricing", name: "Pricing", icon: CreditCard },
    { id: "care", name: "Care & Return", icon: Shield },
    { id: "technical", name: "Technical", icon: Truck }
  ];

  const filteredFAQs = activeCategory === "all" 
    ? faqData 
    : faqData.filter(faq => faq.category === activeCategory);

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our musical instrument rental services.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900 pr-4">
                  {faq.question}
                </span>
                {openItems.has(index) ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              
              {openItems.has(index) && (
                <div className="px-6 pb-4">
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-gray-600 mb-6">
            Can&apos;t find the answer you&apos;re looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@loud-mout-music.com"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
            >
              <HelpCircle className="w-5 h-5 mr-2" />
              Contact Support
            </a>
            <a
              href="tel:+2348146815186"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
            >
              <Clock className="w-5 h-5 mr-2" />
              Call Us
            </a>
          </div>
        </div>

        {/* Quick Contact Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
            <p className="text-gray-600">support@loud-mout-music.com</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
            <p className="text-gray-600">+234 8146815186</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Visit Us</h3>
            <p className="text-gray-600">Paradise 2 estate, Chevron Dr, Lekki, Lagos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
