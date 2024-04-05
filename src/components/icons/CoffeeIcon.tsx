import React from "react";

interface CoffeeIconProps {
  style: string;
  isSelected: boolean;

}

const CoffeeIcon: React.FC<CoffeeIconProps> = ({ style, isSelected }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={style}
      fill={isSelected ? "#6558F5" : "#fffff"}
    >
      <path d="M5 2h2v3H5zm4 0h2v3H9zm4 0h2v3h-2zm6 7h-2V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3h2c1.103 0 2-.897 2-2v-5c0-1.103-.897-2-2-2zm-2 7v-5h2l.002 5H17z"></path>
    </svg>
  );
};

export default CoffeeIcon;