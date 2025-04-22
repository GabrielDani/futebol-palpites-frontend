// components/ui/RoundInput.tsx
import { useEffect, useState } from "react";
import { cn } from "../../../../../lib/utils";

interface RoundInputProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  min?: number;
  max?: number;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

export const RoundInput = ({
  value,
  onChange,
  label = "Rodada",
  min = 1,
  max = 38,
  className = "",
  required = false,
  disabled = false,
}: RoundInputProps) => {
  const [internalValue, setInternalValue] = useState<string>(value.toString());

  useEffect(() => {
    setInternalValue(value.toString());
  }, [value]);

  const handleBlur = () => {
    const numValue = parseInt(internalValue);
    if (isNaN(numValue)) {
      setInternalValue(min.toString());
      onChange(min);
      return;
    }

    const clampedValue = Math.min(Math.max(numValue, min), max);
    setInternalValue(clampedValue.toString());
    onChange(clampedValue);
  };

  return (
    <div className={cn(className)}>
      <label
        className={cn(
          "block text-sm font-medium text-gray-700",
          disabled ? "opacity-70" : ""
        )}
      >
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <input
        type="number"
        min={min}
        max={max}
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        onBlur={handleBlur}
        disabled={disabled}
        className={cn(
          "w-full rounded-md border border-input bg-white px-3 py-2 text-sm shadow-sm outline-none focus:ring-2 focus:ring-emerald-500",
          disabled ? "cursor-not-allowed opacity-70" : ""
        )}
      />
    </div>
  );
};
