import React from "react";
import useRecurrenceStore from "./useRecurrenceStore";

const DateRangePicker = () => {
  const { startDate, endDate, setStartDate, setEndDate } = useRecurrenceStore();

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1">Start Date</label>
        <input
          type="date"
          value={startDate || ""}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1">End Date (optional)</label>
        <input
          type="date"
          value={endDate || ""}
          onChange={(e) => setEndDate(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;