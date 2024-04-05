export type Category = "Hands and Feet" | "Hair" | "Massage and Spa" | "Facial Care" | "Hair Removal" | "Makeup";

export interface Service {
    id: number,
    name: string,
    description: string,
    category: Category,
}

export interface ServiceCategory {
    category: Category;
    services: (Service & { availableTimeslots?: string[], date?: string, serviceId?: number })[];
}

export interface Slots {
    date: string,
    serviceId: number,
    availableTimeslots: string[];
}

export enum BookingSlotStatus {
    Available = 'Available',
    Booked = 'Booked'
}

export interface BookingSelection {
    date: string;
    time: string;
}


export interface BookingDate {
    date: Date;
    slots: BookingSlot[];
}

export interface BookingSlot {
    startTime: Date;
    endTime: Date;
    status: BookingSlotStatus;
}

export interface BookingState {
    selectedService?: Service;
    bookingSelection?: BookingSelection;
    confirmedBooking?: ConfirmedBooking;
}

export interface ConfirmedBooking {
    service: Service;
    date: Date;
    startTime: string;
    endTime: string;
}

export interface AplicationSteps {
    stepService: boolean;
    stepSchedule: boolean;
}

export interface AppStepsState {
    currentStep: 'service' | 'schedule' | 'confirm';
}

export interface BookingStore extends BookingState {
    setSelectedService: (service: Service | undefined) => void; 
    setBookingSelection: (selection: BookingSelection | undefined) => void; 
    setConfirmedBooking: (booking: ConfirmedBooking) => void;
    resetState: () => void;
    getFullBookingState: () => BookingState;
    applicationSteps: AplicationSteps;
    setCurrentStep: (step: 'service' | 'schedule' | 'confirm') => void;
}
