import { create } from "zustand";
const useRecurrenceStore = create((set) => ({
  recurrenceType: "Daily",
  interval: 1,
  selectedDays: [],
  startDate: null,
  endDate: null,
  setRecurrenceType: (type) => set({ recurrenceType: type }),
  setInterval: (value) => set({ interval: value }),
  toggleDay: (day) =>
    set((state) => {
      const selected = state.selectedDays.includes(day)
        ? state.selectedDays.filter((d) => d !== day)
        : [...state.selectedDays, day];
      return { selectedDays: selected };
    }),
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
}));

export default useRecurrenceStore;

