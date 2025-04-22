// components/ui/InputScore.tsx
import { useState, useEffect } from "react";

interface Props {
  initialValue?: number;
  onChange: (value: number | undefined) => void;
  min?: number;
  max?: number;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const InputScore = ({
  initialValue,
  onChange,
  min = 0,
  max = 10,
  placeholder = "-",
  className = "",
  disabled = false,
}: Props) => {
  const [internalValue, setInternalValue] = useState<string>(
    initialValue?.toString() ?? ""
  );

  // Sincroniza apenas quando initialValue muda externamente (ex: reset do formulário)
  useEffect(() => {
    setInternalValue(initialValue?.toString() ?? "");
  }, [initialValue]);

  const handleBlur = () => {
    if (internalValue === "") {
      onChange(undefined);
    } else {
      const numValue = Number(internalValue);
      if (!isNaN(numValue)) {
        const clampedValue = Math.min(Math.max(numValue, min), max);
        // Garante o valor ajustado caso tenha excedido min/max
        setInternalValue(clampedValue.toString());
        onChange(clampedValue);
      } else {
        onChange(undefined);
      }
    }
  };

  return (
    <input
      type="number"
      min={min}
      max={max}
      placeholder={placeholder}
      value={internalValue}
      onChange={(e) => setInternalValue(e.target.value)}
      onBlur={handleBlur}
      disabled={disabled}
      className={`w-full rounded-md border border-input bg-gray-100 px-3 py-1 text-center text-base shadow-sm outline-none focus:ring-2 focus:ring-emerald-500 ${className}`}
    />
  );
};

InputScore.displayName = "InputScore";
