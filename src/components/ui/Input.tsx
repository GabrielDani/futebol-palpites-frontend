// components/ui/Input.tsx
import React, { forwardRef } from "react";
import classNames from "classnames";

type InputVariant = "default" | "minimal" | "outline";
type InputSize = "sm" | "md" | "lg";

interface BaseInputProps {
  variant?: InputVariant;
  size?: InputSize;
  fullWidth?: boolean;
  error?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

type InputProps = BaseInputProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
    as?: React.ElementType;
  };

const variantClasses: Record<InputVariant, string> = {
  default: "border-b-2 border-primary-400 bg-transparent",
  minimal: "bg-gray-100 rounded",
  outline: "border-2 border-gray-300 rounded focus:border-primary-400",
};

const sizeClasses: Record<InputSize, string> = {
  sm: "py-1 px-2 text-sm",
  md: "py-2 px-3 text-base",
  lg: "py-3 px-4 text-lg",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "default",
      size = "md",
      fullWidth = false,
      error = false,
      icon,
      iconPosition = "left",
      className = "",
      as: Component = "input",
      ...props
    },
    ref
  ) => {
    const wrapperClasses = classNames(
      "flex items-center relative transition-all",
      variantClasses[variant],
      {
        "w-full": fullWidth,
        "border-error-500": error,
        "pl-3": icon && iconPosition === "left",
        "pr-3": icon && iconPosition === "right",
      },
      className
    );

    const inputClasses = classNames(
      "outline-none bg-transparent w-full placeholder-gray-400",
      sizeClasses[size],
      {
        "text-error-500": error,
        "opacity-70 cursor-not-allowed": props.disabled,
      }
    );

    return (
      <div className={wrapperClasses}>
        {icon && iconPosition === "left" && (
          <span className="mr-2 text-gray-500">{icon}</span>
        )}

        <Component ref={ref} className={inputClasses} {...props} />

        {icon && iconPosition === "right" && (
          <span className="ml-2 text-gray-500">{icon}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
