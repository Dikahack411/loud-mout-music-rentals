"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X, Filter } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string, filters: SearchFilters) => void;
  placeholder?: string;
  className?: string;
  showFilters?: boolean;
}

export interface SearchFilters {
  category: string;
  priceRange: string;
  availability: string;
  condition: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search instruments, categories, or brands...",
  className = "",
  showFilters = true,
}) => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({
    category: "",
    priceRange: "",
    availability: "",
    condition: "",
  });
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Sample suggestions - in real app, these would come from API
  const sampleSuggestions = [
    "Guitar",
    "Piano",
    "Drums",
    "Violin",
    "Saxophone",
    "Trumpet",
    "Flute",
    "Microphone",
    "DJ Controller",
    "Studio Equipment",
    "Acoustic",
    "Electric",
    "Fender",
    "Yamaha",
    "Roland",
    "Pearl",
    "Shure",
    "Audio-Technica",
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length > 2) {
      const filtered = sampleSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSearch = () => {
    onSearch(query, filters);
    setShowSuggestions(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion, filters);
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      priceRange: "",
      availability: "",
      condition: "",
    });
    onSearch(query, {
      category: "",
      priceRange: "",
      availability: "",
      condition: "",
    });
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      {/* Main Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 mr-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          {showFilters && (
            <button
              onClick={() => setShowFiltersPanel(!showFiltersPanel)}
              className={`p-2 mr-1 rounded-md transition-colors ${
                showFiltersPanel
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              }`}
              title="Toggle filters"
            >
              <Filter className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition-colors font-medium text-sm"
          >
            Search
          </button>
        </div>
      </div>

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none flex items-center space-x-2"
            >
              <Search className="h-4 w-4 text-gray-400" />
              <span>{suggestion}</span>
            </button>
          ))}
        </div>
      )}

      {/* Filters Panel */}
      {showFilters && showFiltersPanel && (
        <div className="absolute z-20 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Categories</option>
                <option value="string">String Instruments</option>
                <option value="keyboard">Keyboard Instruments</option>
                <option value="percussion">Percussion Instruments</option>
                <option value="wind">Wind Instruments</option>
                <option value="electronic">Electronic Equipment</option>
                <option value="dj">DJ Equipment</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) =>
                  setFilters({ ...filters, priceRange: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Any Price</option>
                <option value="0-25">$0 - $25/day</option>
                <option value="25-50">$25 - $50/day</option>
                <option value="50-100">$50 - $100/day</option>
                <option value="100+">$100+/day</option>
              </select>
            </div>

            {/* Availability Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability
              </label>
              <select
                value={filters.availability}
                onChange={(e) =>
                  setFilters({ ...filters, availability: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All</option>
                <option value="available">Available Now</option>
                <option value="soon">Available Soon</option>
                <option value="unavailable">Currently Rented</option>
              </select>
            </div>

            {/* Condition Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Condition
              </label>
              <select
                value={filters.condition}
                onChange={(e) =>
                  setFilters({ ...filters, condition: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Any Condition</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={clearFilters}
              className="text-gray-600 hover:text-gray-800 text-sm font-medium"
            >
              Clear All Filters
            </button>
            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors font-medium text-sm"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
