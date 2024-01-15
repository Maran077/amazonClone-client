import { useState } from "react";

const SelectionInput = ({ title, values, ...props }) => {
  const selectedValue = values[0];

  return (
    <div className="w-64">
      <h1 className="block font-bold mb-[5px]">{title}</h1>
      <select
        value={selectedValue}
        {...props}
        className="block w-full border border-gray-300 rounded-md py-2 px-3 mb-4 outline-none focus:bg-[#F7FEFF] focus:ring-[3px] focus:ring-cyan-400/40"
      >
        <option value={selectedValue}>{selectedValue}</option>
        {values.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectionInput;
