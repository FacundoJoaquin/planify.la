import { useEffect } from "react";
import ConfirmDateHandler from "./components/ConfirmDateHandler";
import Navbar from "./components/Navbar";
import PickScheduleHandler from "./components/PickScheduleHandler";
import PickServiceHandler from "./components/PickServiceHandler";
import useStore from "./utils/useStore";
import ProgressBar from "./components/ProgressBar";

const App = () => {
  const selectedService = useStore((state) => state.selectedService);
  const fullBookingState = useStore((state) => state.getFullBookingState());
  const { currentStep, setCurrentStep } = useStore((state) => ({
    currentStep: state.currentStep,
    setCurrentStep: state.setCurrentStep,
  }));

  useEffect(() => console.log(fullBookingState), [fullBookingState]);

  return (
    <div className="flex flex-col h-dvh relative">
      <ProgressBar />

      <div className="h-2/3">
        {currentStep && currentStep === "service" && <PickServiceHandler />}
        {currentStep && currentStep === "schedule" && <PickScheduleHandler />}
        {currentStep && currentStep === "confirm" && <ConfirmDateHandler />}
      </div>

      <Navbar
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        selectedService={selectedService}
      />
    </div>
  );
};

export default App;
