import React from "react";

interface InputSelectProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  className?: string;
  options: { value: string; label: string }[];
}

const InputSelect = ({
  label,
  value,
  onChange,
  className,
  options,
}: InputSelectProps) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputSelect;
