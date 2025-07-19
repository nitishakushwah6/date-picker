
export const formatRecurrenceRule = (rule) => {
  const { frequency, interval } = rule;
  
  const frequencyMap = {
    daily: 'day',
    weekly: 'week',
    monthly: 'month',
    yearly: 'year'
  };
  
  const unit = frequencyMap[frequency] || 'day';
  const intervalText = interval === 1 ? '' : `every ${interval} `;
  
  return `Repeats ${intervalText}${unit}${interval === 1 ? '' : 's'}`;
};

/**
 * Validates a date range
 * @param {Date} startDate - The start date
 * @param {Date} endDate - The end date
 * @returns {boolean} - True if the date range is valid
 */
export const isValidDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) return true;
  return new Date(startDate) <= new Date(endDate);
};

/**
 * Generates a list of dates based on recurrence rules
 * @param {Object} options - The recurrence options
 * @param {string} options.frequency - The frequency
 * @param {number} options.interval - The interval
 * @param {Date} options.startDate - The start date
 * @param {Date} options.endDate - The end date
 * @param {Array} options.selectedDays - Selected days for weekly recurrence
 * @returns {Array} - Array of generated dates
 */
export const generateRecurringDates = (options) => {
  const { frequency, interval, startDate, endDate, selectedDays = [] } = options;
  
  if (!startDate) return [];
  
  const dates = [];
  let current = new Date(startDate);
  
  while (true) {
    if (endDate && current > new Date(endDate)) break;
    if (dates.length >= 1000) break; // Safety limit
    
    switch (frequency) {
      case 'daily':
        dates.push(new Date(current));
        current.setDate(current.getDate() + interval);
        break;
      case 'weekly':
        if (selectedDays.includes(current.getDay())) {
          dates.push(new Date(current));
        }
        current.setDate(current.getDate() + 1);
        break;
      case 'monthly':
        dates.push(new Date(current));
        current.setMonth(current.getMonth() + interval);
        break;
      case 'yearly':
        dates.push(new Date(current));
        current.setFullYear(current.getFullYear() + interval);
        break;
      default:
        current.setDate(current.getDate() + 1);
        break;
    }
  }
  
  return dates;
}; 