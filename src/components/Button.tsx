import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const Button = ({ isLoading, children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className="w-full bg-yellow-400 text-gray-900 font-bold py-2 rounded-lg mt-4 hover:bg-yellow-500 transition disabled:opacity-50"
      disabled={isLoading || props.disabled}
    >
      {" "}
      {isLoading ? "Carregando..." : children}
    </button>
  );
};
