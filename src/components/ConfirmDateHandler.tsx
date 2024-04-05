import formatDate from "../utils/functions";
import useStore from "../utils/useStore";
import Box from "./ui/Box"

const ConfirmDateHandler = () => {
  const fullBookingState = useStore((state) => state.getFullBookingState());

  return (
    <Box>
      <p>Servicio: {fullBookingState.selectedService?.name}</p>
      <p>Fecha: {formatDate(fullBookingState.bookingSelection?.date, true)} {fullBookingState.bookingSelection?.time}</p>

    </Box>
  )
}

export default ConfirmDateHandler