import { useEffect, useState } from "react";
import slots from "../data/slots.json";
import { BookingSelection, Slots } from "../utils/types";
import useStore from "../utils/useStore";
import Box from "./ui/Box";
import formatDate from "../utils/functions";

const PickScheduleHandler = () => {
  const [availableSlots, setAvailableSlots] = useState<Slots | undefined>(undefined);
  const fullBookingState = useStore((state) => state.getFullBookingState());
  const setBookingSelection = useStore((state) => state.setBookingSelection);
  
  useEffect(() => {
    if (fullBookingState.selectedService?.id === slots.serviceId) { // Si matchea el id del service con el serviceId de slots, muestra los slots
      setAvailableSlots(slots);
    }
  }, [fullBookingState.selectedService]);

  const morningSlots = slots.availableTimeslots?.filter((time) => { // Divido slots en AM 
    const hour = parseInt(time.split(":")[0], 10);
    return hour < 12;
  });

  const afternoonSlots = slots.availableTimeslots?.filter((time) => { // Divido slots en PM
    const hour = parseInt(time.split(":")[0], 10);
    return hour >= 12;
  });

  const handleBookingSelection = (date: string, time: string) => { // Seteo el estado global de bookingSelection
    const bookingSelection: BookingSelection = {
      date,
      time,
    };

    setBookingSelection(bookingSelection);
  };

  return (
    <Box>
      <div>Próximos turnos disponibles</div>
      {availableSlots ? (
        <div>
          <h2 className="col-span-full">{formatDate(availableSlots.date)}</h2>
          <div className="grid grid-cols-2 gap-4 gap-x-4 overflow-y-auto h-auto mb-8">
            {morningSlots.map((e) => (
              <button
                className="w-full h-12 bg-gray-300 rounded-md grid place-items-center focus:bg-gray-500 focus:text-white transition-colors duration-100"
                key={e}
                onClick={() => handleBookingSelection(availableSlots.date, e)}
              >
                {e}
              </button>
            ))}
            <h2 className="col-span-full">{formatDate(availableSlots.date)}</h2>
            {afternoonSlots.map((e) => (
              <button
                className="w-full h-12 bg-gray-300 rounded-md grid place-items-center focus:bg-gray-500 focus:text-white transition-colors duration-100"
                key={e}
                onClick={() => handleBookingSelection(availableSlots.date, e)}
              >
                {e}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>No hay turnos disponibles</div>
      )}
    </Box>
  );
};

export default PickScheduleHandler;
