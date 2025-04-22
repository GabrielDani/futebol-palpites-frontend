import { cn } from "../../lib/utils";

interface SwitchProps {
  checked: boolean;
  onChange: () => void;
  labelChecked?: string;
  labelUnchecked?: string;
  className?: string;
}

export const Switch = ({
  checked,
  onChange,
  labelChecked,
  labelUnchecked,
  className,
}: SwitchProps) => {
  return (
    <div className={cn("flex items-center", className)}>
      {labelChecked && checked && (
        <span className="mr-4 text-sm text-yellow-400">{labelChecked}</span>
      )}
      {labelUnchecked && !checked && (
        <span className="mr-4 text-sm text-yellow-400">{labelUnchecked}</span>
      )}
      <button
        type="button"
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 ${
          checked ? "bg-yellow-500" : "bg-gray-600"
        }`}
        onClick={onChange}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};
