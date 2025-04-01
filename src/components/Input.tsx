import { InputHTMLAttributes, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  type: "text" | "password";
}

export const Input = ({ icon, ...props }: InputProps) => {
  const [showPassword, setPassword] = useState(false);

  const isPassword = props.type === "password";

  return (
    <div className="flex items-center border-b-2 border-yellow-400 py-2 relative">
      {icon && <span className="text-yellow-400 mr-2">{icon}</span>}
      <input
        {...props}
        type={isPassword && !showPassword ? "password" : "text"}
        className="bg-transparent outline-none flex-1 p-2 text-white placeholder-gray-400 pr-10"
      />
      {isPassword && (
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
