import React, { useState } from "react";

import useClickOutside from "@/hooks/global/useClickOutside";

type Props = {
  value: { name: string; address: string };
  onChange: (value: { name: string; address: string }) => void; //eslint-disable-line
  data: { name: string; address: string }[];
};
const CustomAddressSelect: React.FC<Props> = ({ value, onChange, data }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="w-full relative"
      ref={useClickOutside(() => {
        setIsOpen(false);
      })}
    >
      <input value={value?.name} readOnly onFocus={() => setIsOpen(true)} className="cursor-pointer" />
      {isOpen && (
        <div className="absolute bg-gray-950/60 backdrop-blur-md w-full left-0 top-full mt-5 rounded-8 p-12 z-20 max-h-400 overflow-y-auto flex flex-col gap-4">
          {data.map((item, i) => {
            return (
              <div
                key={i}
                className="cursor-pointer hover:bg-indigo-200/10 p-8 rounded-4"
                onClick={() => {
                  onChange(item);
                  setIsOpen(false);
                }}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomAddressSelect;
