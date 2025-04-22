// components/ui/date-picker.tsx
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";

const datePickerVariants = cva(
  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      hasIcon: {
        true: "pl-10",
        false: "",
      },
      dimension: {
        sm: "h-8",
        md: "h-10",
        lg: "h-12",
      },
    },
    defaultVariants: {
      hasIcon: false,
      dimension: "md",
    },
  }
);

interface DatePickerProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "onChange"
  > {
  showIcon?: boolean;
  showTimeSelect?: boolean;
  dimension?: "sm" | "md" | "lg";
  selected?: string;
  onChange?: (date: string | null) => void;
}

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      className,
      dimension = "md",
      showIcon = false,
      showTimeSelect = false,
      selected,
      onChange,
      ...props
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const date = e.target.value;
      onChange?.(date);
    };

    // const formatDateForInput = (date: Date | undefined) => {
    //   if (!date) return "";
    //   return date.toISOString().slice(0, 16); // Formato datetime-local
    // };

    return (
      <div className="relative">
        {showIcon && (
          <CalendarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        )}
        <input
          ref={ref}
          type={showTimeSelect ? "datetime-local" : "date"}
          className={cn(
            datePickerVariants({
              hasIcon: showIcon,
              dimension,
            }),
            className
          )}
          value={selected}
          onChange={handleChange}
          {...props}
        />
      </div>
    );
  }
);
DatePicker.displayName = "DatePicker";

export { DatePicker };
