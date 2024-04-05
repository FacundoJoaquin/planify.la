import { create } from 'zustand';
import {
  AppStepsState,
  BookingSelection,
  BookingStore,
  ConfirmedBooking,
  Service
} from './types';



const useStore = create<BookingStore & AppStepsState>((set, get) => ({
  selectedCategory: undefined,
  selectedService: undefined,
  bookingSelection: undefined,
  confirmedBooking: undefined,
  applicationSteps: {
    stepService: false,
    stepSchedule: false,
  },
  currentStep: 'service',


  setSelectedService: (service: Service | undefined) =>
    set((state) => ({ ...state, selectedService: service })),

  setBookingSelection: (selection: BookingSelection | undefined) =>
    set((state) => ({ ...state, bookingSelection: selection })),

  setConfirmedBooking: (booking: ConfirmedBooking) =>
    set((state) => ({ ...state, confirmedBooking: booking })),


  setCurrentStep: (step: 'service' | 'schedule' | 'confirm') => set(() => ({ currentStep: step })),


  resetState: () =>
    set(() => ({
      selectedCategory: undefined,
      selectedService: undefined,
      bookingSelection: undefined,
      confirmedBooking: undefined,
    })),

  getFullBookingState: () => {
    return {
      selectedService: get().selectedService,
      bookingSelection: get().bookingSelection,
      confirmedBooking: get().confirmedBooking,
    };

  }
}));


export default useStore;