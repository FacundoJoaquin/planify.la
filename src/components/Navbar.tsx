import { useState } from "react";
import Coffee from "./icons/CoffeeIcon.tsx";
import { Service } from "../utils/types.ts";
import useStore from "../utils/useStore.ts";

const NavItems = [
  { id: 1, title: "Reservar" },
  { id: 2, title: "Mis turnos" },
];

interface NavbarProps {
  selectedService: Service | undefined;
  currentStep: string;
  setCurrentStep(step: string): void;
}

const Navbar: React.FC<NavbarProps> = ({
  selectedService,
  currentStep,
  setCurrentStep,
}) => {
  const [navSelected, setNavSelected] = useState(1);
  const fullBookingState = useStore((state) => state.getFullBookingState());
  const setSelectedService = useStore((state) => state.setSelectedService);
  const setBookingSelection = useStore((state) => state.setBookingSelection);

  const handleNext = () => { // Handler de boton Siguiente 
    if (
      currentStep === "service" &&
      fullBookingState.selectedService !== undefined
    ) {
      setCurrentStep("schedule");
    } else if (
      currentStep === "schedule" &&
      fullBookingState.bookingSelection !== undefined
    ) {
      setCurrentStep("confirm");
    }
  };

  const handlePrevious = () => { // Handle de boton Anterior
    if (currentStep === "schedule") {
      setSelectedService(undefined)
      setCurrentStep("service");
    } else if (currentStep === "confirm") {
      setBookingSelection(undefined)
      setCurrentStep("schedule");
    }
  };

  const isNextButtonDisabled =
  currentStep === "service" && fullBookingState.selectedService == undefined || currentStep === "schedule" && fullBookingState.bookingSelection == undefined;

  return (
    <>
      {selectedService && (
        <div className="fixed bottom-16 bg-white z-50 border p-4 border-r-0 border-l-0 border-gray-700 w-full flex justify-between">
          {currentStep && currentStep != "service" && (
            <button className={`button-primary !bg-gray-700 mr-auto`} onClick={handlePrevious}>
              Anterior
            </button>
          )}
          <button
            className={`button-primary ml-auto ${isNextButtonDisabled ? "!bg-gray-700 opacity-50 cursor-not-allowed" : "!bg-gray-700"}`}
            onClick={handleNext}
            disabled={isNextButtonDisabled} 
          >
            {currentStep === "confirm" ? 'Confirmar' : 'Siguiente'}
          </button>
        </div>
      )}
      <div className="w-full h-16  flex justify-center items-center gap-x-5 fixed bottom-0 bg-white z-50">
        {NavItems.map((e) => {
          return (
            <button
              className={`text-sm grid place-items-center ${
                e.id === navSelected ? "*:text-[#6558F5]" : ""
              }`}
              key={e.id}
              onClick={() => setNavSelected(e.id)}
            >
              <Coffee style={`size-8`} isSelected={e.id === navSelected} />
              <p>{e.title}</p>
              {e.id === navSelected && (
                <span className="w-full h-0.5 bg-[#6558F5]" />
              )}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Navbar;
