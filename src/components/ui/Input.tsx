import { InputHTMLAttributes, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  type?: "text" | "password";
  variant?: "default" | "minimal";
}

export const Input = ({ icon, variant = "default", ...props }: InputProps) => {
  const [showPassword, setPassword] = useState(false);
  const isPassword = props.type === "password";

  const baseClasses = "outline-none flex-1 p-2 placeholder-gray-400 py-4";
  const variantClasses =
    variant === "default"
      ? "border-b-2 border-yellow-400 bg-transparent text-white"
      : "bg-gray-700 rounded text-white";

  return (
    <div className={`flex items-center relative ${variantClasses}`}>
      {icon && <span className="text-yellow-400 mr-2">{icon}</span>}
      <input
        {...props}
        type={isPassword && !showPassword ? "password" : "text"}
        className={`${baseClasses} ${props.className}`}
      />
      {isPassword && variant === "default" && (
        <button
          type="button"
          onClick={() => setPassword(!showPassword)}
          className="absolute right-2 text-yellow-400"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
    </div>
  );
};
