// components/ui/Input.tsx
import React, { forwardRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type InputVariant = "default" | "minimal" | "outline";
type InputType = "text" | "password" | "email" | "number" | "search";
type InputSize = "sm" | "md" | "lg";

interface BaseInputProps {
  icon?: React.ReactNode;
  type?: InputType;
  variant?: InputVariant;
  error?: boolean;
  fullWidth?: boolean;
  inputSize?: InputSize;
  canShowPassword?: boolean;
}

type InputProps = BaseInputProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">;

const variantClasses: Record<InputVariant, string> = {
  default: "border-b-2 border-yellow-400 bg-transparent text-white",
  minimal: "bg-gray-700 rounded text-white",
  outline:
    "border-2 border-gray-600 rounded bg-transparent text-white focus:border-yellow-400",
};

const sizeClasses: Record<InputSize, string> = {
  sm: "py-2 px-3 text-sm",
  md: "py-3 px-4 text-base",
  lg: "py-4 px-5 text-lg",
};

export const InputAuth = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      icon,
      type = "text",
      variant = "default",
      className = "",
      error = false,
      fullWidth = false,
      inputSize = "md",
      canShowPassword = true,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType =
      isPassword && !showPassword ? "password" : isPassword ? "text" : type;

    const baseClasses = `outline-none flex-1 placeholder-gray-400 transition-all ${
      sizeClasses[inputSize]
    } ${error ? "border-red-500" : ""} ${fullWidth ? "w-full" : ""}`;

    return (
      <div
        className={`flex items-center relative rounded ${
          variantClasses[variant]
        } ${error ? "!border-red-500" : ""} ${className}`}
      >
        {icon && <span className="text-yellow-400 mr-2">{icon}</span>}

        <input
          ref={ref}
          type={inputType}
          className={`${baseClasses} bg-transparent mr-10 ${
            props.disabled ? "opacity-70 cursor-not-allowed" : ""
          }`}
          {...props}
        />

        {isPassword && canShowPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 text-yellow-400 hover:text-yellow-300 transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        )}
      </div>
    );
  }
);

InputAuth.displayName = "InputAuth";
