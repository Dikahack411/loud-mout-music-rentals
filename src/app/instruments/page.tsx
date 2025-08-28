"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import SearchBar, { SearchFilters } from "@/components/ui/SearchBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RentalForm from "@/components/ui/RentalForm";

interface Instrument {
  id: string;
  name: string;
  type: string;
  image: string;
  description: string;
  price?: number;
  condition?: string;
  available?: boolean;
}

const sampleInstruments: Instrument[] = [
  {
    id: "1",
    name: "Disk-Jockey",
    type: "DJ",
    image: "/2g.png",
    description: "A high-quality Disk-Jockey perfect for bookings.",
    price: 45,
    condition: "excellent",
    available: true,
  },
  {
    id: "2",
    name: "Roland Digital Piano",
    type: "Piano",
    image:
      "https://images.unsplash.com/photo-1548701213-a7c7872f4df7?w=800&auto=format&fit=crop&q=60",
    description: "A versatile digital piano with realistic sound and feel.",
    price: 120,
    condition: "excellent",
    available: true,
  },
  {
    id: "3",
    name: "Pearl Drum Set",
    type: "Drums",
    image:
      "https://images.unsplash.com/photo-1707409189962-0e6cdf81fb16?w=800&auto=format&fit=crop&q=60",
    description: "A complete drum set for all your rhythm needs.",
    price: 85,
    condition: "good",
    available: true,
  },
  {
    id: "4",
    name: "Acoustic Flutes",
    type: "Flutes",
    image:
      "https://images.unsplash.com/photo-1580719653258-26873fde0b4d?w=800&auto=format&fit=crop&q=60",
    description: "A simple flute for all your rhythm needs.",
    price: 25,
    condition: "excellent",
    available: true,
  },
  {
    id: "5",
    name: "Brass Trumpet",
    type: "Brass",
    image:
      "https://images.unsplash.com/photo-1573871669414-010dbf73ca84?w=800&auto=format&fit=crop&q=60",
    description: "A brass trumpet for all your rhythm needs.",
    price: 35,
    condition: "good",
    available: false,
  },
  {
    id: "6",
    name: "Saxophone",
    type: "Saxophone",
    image:
      "https://images.unsplash.com/photo-1566454108377-77a89ec31134?w=800&auto=format&fit=crop&q=60",
    description: "A saxophone for all your rhythm needs.",
    price: 55,
    condition: "excellent",
    available: true,
  },
  {
    id: "7",
    name: "Violin Set",
    type: "Violin",
    image:
      "https://images.unsplash.com/photo-1472312656035-eeef4726de6c?w=800&auto=format&fit=crop&q=60",
    description: "A complete violin set for all your rhythm needs.",
    price: 40,
    condition: "good",
    available: true,
  },
  {
    id: "8",
    name: "Condenser Microphone",
    type: "Microphone",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60",
    description: "A condenser microphone for all your vocal needs.",
    price: 20,
    condition: "excellent",
    available: true,
  },
  {
    id: "9",
    name: "DJ Controller",
    type: "DJ Set",
    image:
      "https://images.unsplash.com/photo-1619597361832-a568b1e0555f?w=800&auto=format&fit=crop&q=60",
    description: "A complete DJ set for all your party needs.",
    price: 65,
    condition: "excellent",
    available: true,
  },
  {
    id: "10",
    name: "Studio Set",
    type: "Drums",
    image:
      "https://images.unsplash.com/photo-1542464497-e217d476a9b2?w=800&auto=format&fit=crop&q=60",
    description: "A complete studio set for all your production needs.",
    price: 95,
    condition: "good",
    available: false,
  },
  {
    id: "11",
    name: "Drum",
    type: "Drums",
    image:
      "https://media.istockphoto.com/id/2165367748/photo/drummers-and-their-instruments.webp?a=1&b=1&s=612x612&w=0&k=20&c=HiAnLo0yvZcrh1D3XRhUdJxIxeIhCK7CwFseXzJKn9g=",
    description: "A complete studio set for all your production needs.",
    price: 30,
    condition: "fair",
    available: true,
  },
  {
    id: "12",
    name: "Acoustic Guitar",
    type: "Guitar",
    image:
      "https://plus.unsplash.com/premium_photo-1681396937086-8a28edd8d257?w=800&auto=format&fit=crop&q=60",
    description: "A complete studio set for all your production needs.",
    price: 35,
    condition: "excellent",
    available: true,
  },
];

const fetchInstruments = async (): Promise<Instrument[]> => {
  try {
    const res = await fetch("/api/instruments");
    if (!res.ok) throw new Error("Network response was not ok");
    return await res.json();
  } catch {
    // fallback to sample data
    return sampleInstruments;
  }
};

const InstrumentsPage: React.FC = () => {
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [filteredInstruments, setFilteredInstruments] = useState<Instrument[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<SearchFilters>({
    category: "",
    priceRange: "",
    availability: "",
    condition: "",
  });
  const [selectedInstrument, setSelectedInstrument] =
    useState<Instrument | null>(null);

  useEffect(() => {
    fetchInstruments().then((data) => {
      setInstruments(data);
      setFilteredInstruments(data);
      setLoading(false);
    });
  }, []);

  const handleSearch = (query: string, filters: SearchFilters) => {
    setSearchQuery(query);
    setActiveFilters(filters);

    let filtered = [...instruments];

    // Text search
    if (query.trim()) {
      filtered = filtered.filter(
        (instrument) =>
          instrument.name.toLowerCase().includes(query.toLowerCase()) ||
          instrument.type.toLowerCase().includes(query.toLowerCase()) ||
          instrument.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter((instrument) => {
        const instrumentType = instrument.type.toLowerCase();
        switch (filters.category) {
          case "string":
            return ["guitar", "violin", "bass", "cello", "ukulele"].some(
              (type) => instrumentType.includes(type)
            );
          case "keyboard":
            return ["piano", "keyboard", "organ", "synthesizer"].some((type) =>
              instrumentType.includes(type)
            );
          case "percussion":
            return ["drums", "drum", "percussion", "cymbal"].some((type) =>
              instrumentType.includes(type)
            );
          case "wind":
            return ["flute", "saxophone", "trumpet", "clarinet", "brass"].some(
              (type) => instrumentType.includes(type)
            );
          case "electronic":
            return ["microphone", "amp", "pedal", "processor"].some((type) =>
              instrumentType.includes(type)
            );
          case "dj":
            return ["dj", "controller", "turntable"].some((type) =>
              instrumentType.includes(type)
            );
          default:
            return true;
        }
      });
    }

    // Price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number);
      filtered = filtered.filter((instrument) => {
        if (!instrument.price) return false;
        if (filters.priceRange === "100+") {
          return instrument.price >= 100;
        }
        return instrument.price >= min && instrument.price <= max;
      });
    }

    // Availability filter
    if (filters.availability) {
      filtered = filtered.filter((instrument) => {
        switch (filters.availability) {
          case "available":
            return instrument.available === true;
          case "unavailable":
            return instrument.available === false;
          default:
            return true;
        }
      });
    }

    // Condition filter
    if (filters.condition) {
      filtered = filtered.filter(
        (instrument) => instrument.condition === filters.condition
      );
    }

    setFilteredInstruments(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading instruments...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Paystack Inline Script */}
      <Script
        src="https://js.paystack.co/v1/inline.js"
        strategy="afterInteractive"
      />

      <div className="min-h-screen bg-gray-50">
        <Header />

        {/* Hero Section with Search */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Find Your Perfect Instrument
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Search through our extensive collection of musical instruments
                available for rent
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search for instruments, brands, or categories..."
                className="w-full"
              />
            </div>

            {/* Search Results Summary */}
            {searchQuery ||
            Object.values(activeFilters).some((filter) => filter) ? (
              <div className="mt-6 text-center">
                <p className="text-blue-100">
                  Found {filteredInstruments.length} instrument
                  {filteredInstruments.length !== 1 ? "s" : ""}
                  {searchQuery && ` matching "${searchQuery}"`}
                </p>
                <button
                  onClick={() =>
                    handleSearch("", {
                      category: "",
                      priceRange: "",
                      availability: "",
                      condition: "",
                    })
                  }
                  className="mt-2 text-blue-200 hover:text-white underline text-sm"
                >
                  Clear search & filters
                </button>
              </div>
            ) : (
              <div className="mt-6 text-center">
                <p className="text-blue-100">
                  {instruments.length} instruments available for rent
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Instruments Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {filteredInstruments.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No instruments found
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search terms or filters to find what
                you&apos;re looking for.
              </p>
              <button
                onClick={() =>
                  handleSearch("", {
                    category: "",
                    priceRange: "",
                    availability: "",
                    condition: "",
                  })
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredInstruments.map((instrument) => (
                <div
                  key={instrument.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    <img
                      src={instrument.image}
                      alt={instrument.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                        {instrument.name}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          instrument.available
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {instrument.available ? "Available" : "Rented"}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mb-2">
                      {instrument.type}
                    </p>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                      {instrument.description}
                    </p>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-blue-600">
                        ${instrument.price || "N/A"}/day
                      </span>
                      {instrument.condition && (
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            instrument.condition === "excellent"
                              ? "bg-blue-100 text-blue-800"
                              : instrument.condition === "good"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {instrument.condition}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedInstrument(instrument)}
                      disabled={!instrument.available}
                      className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                        instrument.available
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {instrument.available ? "Rent Now" : "Currently Rented"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Footer />
      </div>

      {/* Rental Form Modal */}
      {selectedInstrument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <RentalForm
            instrument={selectedInstrument}
            onClose={() => setSelectedInstrument(null)}
          />
        </div>
      )}
    </>
  );
};

export default InstrumentsPage;
