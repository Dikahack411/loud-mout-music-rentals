"use client";

import React, { useState } from "react";
import { Calendar, Clock, DollarSign, CalendarDays } from "lucide-react";
import PaymentModal from "./PaymentModal";

interface RentalFormProps {
  instrument: {
    id: string;
    name: string;
    dailyRate: number;
    weeklyRate: number;
    monthlyRate: number;
    image: string;
  };
  onClose: () => void;
}

const RentalForm: React.FC<RentalFormProps> = ({ instrument, onClose }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [duration, setDuration] = useState(1);
  const [durationType, setDurationType] = useState<
    "daily" | "weekly" | "monthly"
  >("daily");
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Calculate minimum start date (today)
  const today = new Date().toISOString().split("T")[0];

  // Calculate end date based on start date and duration
  const calculateEndDate = (
    start: string,
    dur: number,
    type: "daily" | "weekly" | "monthly"
  ) => {
    if (!start) return "";

    const startDateObj = new Date(start);
    const endDateObj = new Date(startDateObj);

    switch (type) {
      case "daily":
        endDateObj.setDate(startDateObj.getDate() + dur);
        break;
      case "weekly":
        endDateObj.setDate(startDateObj.getDate() + dur * 7);
        break;
      case "monthly":
        endDateObj.setMonth(startDateObj.getMonth() + dur);
        break;
    }

    return endDateObj.toISOString().split("T")[0];
  };

  // Update end date when start date or duration changes
  React.useEffect(() => {
    if (startDate && duration) {
      const calculatedEndDate = calculateEndDate(
        startDate,
        duration,
        durationType
      );
      setEndDate(calculatedEndDate);
    }
  }, [startDate, duration, durationType]);

  // Calculate total amount
  const calculateTotalAmount = () => {
    let rate = 0;
    switch (durationType) {
      case "daily":
        rate = instrument.dailyRate;
        break;
      case "weekly":
        rate = instrument.weeklyRate;
        break;
      case "monthly":
        rate = instrument.monthlyRate;
        break;
    }
    return rate * duration;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      alert("Please select start and end dates");
      return;
    }
    setShowPaymentModal(true);
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
    onClose();
  };

  const totalAmount = calculateTotalAmount();

  return (
    <>
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Rent Instrument
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Instrument Info */}
        <div className="p-6 border-b">
          <div className="flex items-center space-x-4">
            <img
              src={instrument.image}
              alt={instrument.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{instrument.name}</h3>
              <p className="text-lg font-bold text-blue-600">
                ${instrument.dailyRate}/day
              </p>
            </div>
          </div>
        </div>

        {/* Rental Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline w-4 h-4 mr-2" />
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={today}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="inline w-4 h-4 mr-2" />
                Duration
              </label>
              <input
                type="number"
                min="1"
                max="12"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <CalendarDays className="inline w-4 h-4 mr-2" />
                Type
              </label>
              <select
                value={durationType}
                onChange={(e) =>
                  setDurationType(
                    e.target.value as "daily" | "weekly" | "monthly"
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="daily">Day(s)</option>
                <option value="weekly">Week(s)</option>
                <option value="monthly">Month(s)</option>
              </select>
            </div>
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline w-4 h-4 mr-2" />
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || today}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Price Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3 flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Price Summary
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>
                  Rental Fee ({duration} {durationType}
                  {duration > 1 ? "s" : ""}):
                </span>
                <span>${totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Security Deposit (20%):</span>
                <span>${(totalAmount * 0.2).toFixed(2)}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Amount:</span>
                  <span className="text-blue-600">
                    ${(totalAmount * 1.2).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!startDate || !endDate}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Proceed to Payment
          </button>
        </form>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={handleClosePaymentModal}
          instrument={instrument}
          rentalDetails={{
            startDate,
            endDate,
            duration,
            durationType,
            totalAmount,
          }}
        />
      )}
    </>
  );
};

export default RentalForm;
