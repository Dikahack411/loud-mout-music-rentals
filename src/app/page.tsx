"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Music,
  Guitar,
  Piano,
  Drum,
  Mic,
  ArrowRight,
  Star,
  Users,
  Award,
  CheckCircle,
} from "lucide-react";

const HomePage: React.FC = () => {
  const { user } = useAuth();

  const featuredInstruments = [
    {
      id: 1,
      name: "Fender Stratocaster",
      category: "String",
      image:
        "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=1200&auto=format&fit=crop&q=60",
      price: 25,
      rating: 4.8,
      reviews: 124,
    },
    {
      id: 2,
      name: "Yamaha Grand Piano",
      category: "Keyboard",
      image:
        "https://plus.unsplash.com/premium_photo-1726930176733-d6f840d80472?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8WWFtYWhhJTIwR3JhbmQlMjBQaWFub3xlbnwwfHwwfHx8MA%3D%3D",
      price: 150,
      rating: 4.9,
      reviews: 89,
    },
    {
      id: 3,
      name: "Pearl Export Drum Kit",
      category: "Percussion",
      image:
        "https://images.unsplash.com/photo-1678214024599-633e687b6a23?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJsYWNrJTIwbWFuJTIwUGVhcmwlMjBFeHBvcnQlMjBEcnVtJTIwS2l0fGVufDB8fDB8fHww",
      price: 75,
      rating: 4.7,
      reviews: 156,
    },
    {
      id: 4,
      name: "Shure SM58 Microphone",
      category: "Electronic",
      image:
        "https://images.unsplash.com/photo-1584634019291-28ade8e0892d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJsYWNrJTIwbWFuJTIwb24lMjBTaHVyZSUyMFNNNTglMjBNaWNyb3Bob25lfGVufDB8fDB8fHww",
      price: 15,
      rating: 4.6,
      reviews: 203,
    },
  ];

  const categories = [
    {
      name: "String Instruments",
      icon: Guitar,
      count: 45,
      color: "bg-blue-500",
    },
    {
      name: "Keyboard Instruments",
      icon: Piano,
      count: 23,
      color: "bg-purple-500",
    },
    {
      name: "Percussion Instruments",
      icon: Drum,
      count: 34,
      color: "bg-orange-500",
    },
    {
      name: "Electronic Equipment",
      icon: Mic,
      count: 28,
      color: "bg-green-500",
    },
  ];

  const features = [
    {
      title: "Quality Instruments",
      description:
        "All instruments are professionally maintained and regularly inspected for optimal performance.",
      icon: Award,
    },
    {
      title: "Flexible Rental Periods",
      description:
        "Rent by day, week, or month with competitive rates and no hidden fees.",
      icon: CheckCircle,
    },
    {
      title: "Expert Support",
      description:
        "Our team of music professionals is here to help you find the perfect instrument.",
      icon: Users,
    },
    {
      title: "Easy Booking",
      description:
        "Simple online booking process with secure payment options and instant confirmation.",
      icon: CheckCircle,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Rent Musical Instruments
              <span className="block text-blue-200">Made Simple</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Access professional-quality musical instruments without the
              commitment of ownership. Perfect for events, practice, or trying
              new instruments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/instruments"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                Browse Instruments
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              {!user && (
                <Link
                  href="/register"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Sign Up Free
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 opacity-20">
          <Music className="w-16 h-16" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-20">
          <Guitar className="w-16 h-16" />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explore Instrument Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From classical to contemporary, we have instruments for every
              style and skill level.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/instruments?category=${category.name.split(" ")[0]}`}
                className="group bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
              >
                <div
                  className={`${category.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600">
                  {category.count} instruments available
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Instruments */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Instruments
            </h2>
            <p className="text-lg text-gray-600">
              Popular instruments chosen by our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredInstruments.map((instrument) => (
              <Link
                key={instrument.id}
                href={`/instruments?highlight=${instrument.id}`}
                aria-label={`View ${instrument.name} in instruments`}
                className="group block focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-lg"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow group-hover:shadow-lg cursor-pointer">
                  <div className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                    <img
                      src={instrument.image}
                      alt={instrument.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">
                      {instrument.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {instrument.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-600">
                        ${instrument.price}/day
                      </span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">
                          {instrument.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/instruments"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              View All Instruments
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Loud-Mout-Music Rentals?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We make renting musical instruments easy, affordable, and
              reliable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Musical Journey?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of musicians who trust Loud-Mout-Music Rentals for
            their instrument needs with a budget friendly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/instruments"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse Instruments
            </Link>
            {!user && (
              <Link
                href="/register"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Create Account
              </Link>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
