import { useEffect, useState } from "react";
import servicesData from "../data/services.json";
import { Category, Service, ServiceCategory } from "../utils/types";
import useStore from "../utils/useStore";
import PlusIcon from "./icons/PlusIcon";
import Box from "./ui/Box";

const PickServiceHandler = () => {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const setSelectedService = useStore((state) => state.setSelectedService);

  const selectedService = useStore((state) => state.selectedService);

  useEffect(() => {
    const tempCategories: ServiceCategory[] = []; // Array temporal para almacenar la estructura de datos

    const allCategories: Category[] = [ // Instanciamos el array con las categorias
      "Hands and Feet",
      "Hair",
      "Massage and Spa",
      "Facial Care",
      "Hair Removal",
      "Makeup",
    ];
    allCategories.forEach((category) => {
      tempCategories.push({ category: category, services: [] });
    });

    servicesData.services.forEach((service) => { // Agrupamos por service x category
      const categoryIndex = tempCategories.findIndex(
        (c) => c.category === service.category
      );
      if (categoryIndex !== -1) {
        tempCategories[categoryIndex].services.push(
          service as Service & { availableTimeslots?: string[] }
        );
      }
    });

    setCategories(tempCategories);
  }, []);

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category); // Handler para expander categorias
  };

  const handleCategoryClick = (category: string) => {
    toggleCategory(category);
  };

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service); // Actualiza el estado global del servicio seleccionado
  };


  return (
      <Box>
          <p>Categories</p>
          <div className="flex flex-col gap-y-1">
            {categories.map(({ category, services }) => (
              <div key={category}>
                <button
                  className="flex w-full justify-between bg-[#F2F5F7] text-start"
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                  <PlusIcon style={"size-7"} />
                </button>
                {expandedCategory === category && (
                  <div className="flex flex-col gap-y-4 my-2">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className="min-h-32 relative border border-gray-400 p-1"
                      >
                        <p>{service.name}</p>
                        <p>{service.description}</p>
                        <button
                          className={`absolute right-4 bottom-2 w-fit p-1 px-3 rounded-md bg-gray-500 text-white ${service.id === selectedService?.id ? 'bg-gray-700' : ''}`}
                          onClick={() => handleServiceSelect(service)}
                        >
                          {selectedService?.id === service.id ? 'Seleccionado' : 'Seleccionar'}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
    </Box>
  );
};

export default PickServiceHandler;
