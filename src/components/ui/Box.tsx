interface BoxProps {
  children: React.ReactNode;
}

const Box: React.FC<BoxProps> = ({ children }) => {
  return (
    <div className="w-full flex justify-center overflow-y-auto h-full mb-32">
      <div className="w-11/12 flex flex-col border border-gray-400 h-fit p-4 gap-y-2">
        {children}
      </div>
    </div>
  );
};

export default Box;
