import React, { useState } from "react";
import useRecurrenceStore from "./useRecurrenceStore";
import DateRangePicker from "./DateRangePicker";
import CalendarPreview from "./CalendarPreview";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RecurringDatePicker = () => {
  const {
    recurrenceType,
    interval,
    selectedDays,
    setRecurrenceType,
    setInterval,
    toggleDay,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
  } = useRecurrenceStore();

  const [endCondition, setEndCondition] = useState("date");
  const [occurrenceCount, setOccurrenceCount] = useState(10);

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const isInvalidRange = startDate && endDate && new Date(startDate) > new Date(endDate);

  const handleDownload = () => {
    const dates = document.querySelectorAll(".calendar-date");
    if (!dates.length) return;

    const csvContent = Array.from(dates)
      .map((el) => el.textContent)
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "recurring_dates.csv";
    link.click();
  };

  return (
    <div className="space-y-8">
   
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
          Recurrence Pattern
        </h3>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
          <label className="font-medium text-gray-700 mb-3 md:mb-0">Frequency:</label>
          <div className="flex flex-wrap gap-3">
            {["Daily", "Weekly", "Monthly", "Yearly"].map((type) => (
              <button
                key={type}
                className={`px-6 py-3 rounded-xl border-2 text-sm font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg btn-hover-effect ${
                  recurrenceType === type
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-500 shadow-lg"
                    : "bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                }`}
                onClick={() => setRecurrenceType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

  
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
          Interval Settings
        </h3>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <label className="font-medium text-gray-700">Every</label>
          <div className="relative">
            <input
              type="number"
              min="1"
              value={interval}
              onChange={(e) => setInterval(parseInt(e.target.value) || 1)}
              className="border-2 border-purple-200 rounded-xl p-3 w-24 text-center shadow-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-200 font-semibold text-lg"
            />
          </div>
          <span className="text-gray-600 font-semibold text-lg">{recurrenceType}</span>
        </div>
      </div>

      {recurrenceType === "Weekly" && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            Select Days of the Week
          </h3>
          <div className="flex flex-wrap gap-3">
            {weekdays.map((day, index) => (
              <button
                key={index}
                onClick={() => toggleDay(index)}
                className={`px-5 py-3 rounded-xl border-2 font-semibold transition-all duration-200 hover:scale-105 hover:shadow-md btn-hover-effect ${
                  selectedDays.includes(index)
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-500 shadow-lg"
                    : "bg-white text-gray-700 border-gray-200 hover:border-green-300 hover:bg-green-50"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
          Date Range
        </h3>
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-2">Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              className="border-2 border-orange-200 rounded-xl px-4 py-3 shadow-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all duration-200 font-medium"
              placeholderText="Select start date"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-2">End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="dd/MM/yyyy"
              className="border-2 border-orange-200 rounded-xl px-4 py-3 shadow-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all duration-200 font-medium"
              placeholderText="Select end date"
            />
          </div>
        </div>
      </div>

   
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
          End Condition
        </h3>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <label className="font-medium text-gray-700">Ends:</label>
          <select
            value={endCondition}
            onChange={(e) => setEndCondition(e.target.value)}
            className="border-2 border-teal-200 rounded-xl px-4 py-3 shadow-sm focus:border-teal-400 focus:ring-2 focus:ring-teal-200 transition-all duration-200 font-medium bg-white"
          >
            <option value="date">On End Date</option>
            <option value="count">After N Occurrences</option>
            <option value="never">Never</option>
          </select>
          {endCondition === "count" && (
            <div className="relative">
              <input
                type="number"
                value={occurrenceCount}
                onChange={(e) => setOccurrenceCount(parseInt(e.target.value) || 1)}
                className="border-2 border-teal-200 rounded-xl px-4 py-3 shadow-sm focus:border-teal-400 focus:ring-2 focus:ring-teal-200 transition-all duration-200 font-medium w-32"
                placeholder="Count"
                min="1"
              />
            </div>
          )}
        </div>
      </div>

      {isInvalidRange && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-600 font-medium flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            Start date cannot be after end date.
          </p>
        </div>
      )}

      <CalendarPreview endCondition={endCondition} occurrenceCount={occurrenceCount} />

  
      <div className="flex justify-center">
        <button
          onClick={handleDownload}
          disabled={isInvalidRange}
          className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 btn-hover-effect animate-fade-in-up"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download Dates (CSV)
        </button>
      </div>
    </div>
  );
};

export default RecurringDatePicker;
