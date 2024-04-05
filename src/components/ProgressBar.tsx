import useStore from "../utils/useStore";

const ProgressBar = () => {
  const currentStep = useStore((state) => state.currentStep);

  const getProgressValue = (step: string) => {
    switch (step) {
      case "service":
        return 20;
      case "schedule":
        return 60;
      case "confirm":
        return 90;
      default:
        return 0;
    }
  };

  const getLabelText = (step: string) => {
    switch (step) {
      case "service":
        return "Seleccionar servicio";
      case "schedule":
        return "Seleccionar horario";
      case "confirm":
        return "Confirmar reserva";
      default:
        return "Seleccionar servicio";
    }
  };

  return (
    <div className="w-full px-6 my-4 bg-white rounded-md overflow-hidden flex flex-col items-start">
      <p className="font-bold">{getLabelText(currentStep)}</p>
      <div className="w-full bg-gray-200 rounded-md overflow-hidden">
        <div
          className="h-2 bg-green-400 rounded-md transition-all"
          style={{ width: `${getProgressValue(currentStep)}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
