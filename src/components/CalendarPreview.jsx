import React, { useState } from "react";
import { format, addDays, addMonths, addYears, isBefore, isEqual, isAfter } from "date-fns";
import useRecurrenceStore from "./useRecurrenceStore";

const CalendarPreview = ({ endCondition, occurrenceCount }) => {
  const { recurrenceType, interval, selectedDays, startDate, endDate } = useRecurrenceStore();
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleDateClick = (date, index) => {
    const formattedDate = format(date, "dd/MM/yyyy");
    navigator.clipboard.writeText(formattedDate).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  const generateRecurringDates = () => {
    const dates = [];
    if (!startDate || (endCondition === "date" && (!endDate || isAfter(new Date(startDate), new Date(endDate))))) return dates;

    let current = new Date(startDate);
    while (true) {
      if (endCondition === "date" && (isAfter(current, new Date(endDate)))) break;
      if (endCondition === "count" && dates.length >= occurrenceCount) break;
      if (endCondition === "never" && dates.length >= 1000) break;

      switch (recurrenceType) {
        case "Daily":
          dates.push(new Date(current));
          current = addDays(current, interval);
          break;
        case "Weekly":
          if (selectedDays.includes(current.getDay())) {
            dates.push(new Date(current));
          }
          current = addDays(current, 1);
          break;
        case "Monthly": {
          const day = current.getDate();
          dates.push(new Date(current));
          current = new Date(current.setMonth(current.getMonth() + interval));
          const maxDay = new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate();
          current.setDate(Math.min(day, maxDay));
          break;
        }
        case "Yearly": {
          const yearDay = current.getDate();
          const yearMonth = current.getMonth();
          dates.push(new Date(current));
          current.setFullYear(current.getFullYear() + interval);
          const maxYearDay = new Date(current.getFullYear(), yearMonth + 1, 0).getDate();
          current.setMonth(yearMonth);
          current.setDate(Math.min(yearDay, maxYearDay));
          break;
        }
        default:
          current = addDays(current, 1);
          break;
      }
    }
    return dates;
  };

  const recurringDates = generateRecurringDates();

  return (
    <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <span className="w-2 h-2 bg-slate-500 rounded-full mr-3"></span>
        Generated Dates Preview
        <span className="ml-auto text-sm font-medium text-gray-500 bg-white px-3 py-1 rounded-full border">
          {recurringDates.length} dates
        </span>
      </h3>
      
      {recurringDates.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">No dates to show. Please configure your recurrence settings.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 max-h-96 overflow-y-auto custom-scrollbar">
          {recurringDates.map((date, idx) => (
            <div
              key={idx}
              className="calendar-date group relative bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200 cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${idx * 50}ms` }}
              onClick={() => handleDateClick(date, idx)}
            >
              <div className="text-center">
                <div className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {format(date, "dd")}
                </div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  {format(date, "MMM")}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {format(date, "yyyy")}
                </div>
                <div className="text-xs font-medium text-blue-600 mt-1">
                  {format(date, "EEE")}
                </div>
              </div>
              <div className="absolute top-1 right-1 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
             
              {copiedIndex === idx && (
                <div className="absolute inset-0 bg-green-500 bg-opacity-90 rounded-xl flex items-center justify-center animate-pulse-slow">
                  <div className="text-white font-bold text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {recurringDates.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            💡 Click on any date to copy it to clipboard
          </p>
        </div>
      )}
    </div>
  );
};

export default CalendarPreview;
