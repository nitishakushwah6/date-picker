import React from "react";
import RecurringDatePicker from "./components/RecurringDatePicker";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
       
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Recurring Date Picker
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create beautiful recurring schedules with our intuitive and powerful date picker
          </p>
          <div className="flex justify-center mt-6 space-x-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse-slow"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse-slow" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse-slow" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl border border-white/20 p-6 md:p-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <RecurringDatePicker />
        </div>
        
  
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>✨ Built with React & Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}
