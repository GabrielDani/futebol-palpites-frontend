// components/ui/button.tsx
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-600 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-yellow-400 text-gray-900 hover:bg-yellow-500", // primary
        destructive: "bg-red-600 text-white hover:bg-red-500", // destructive
        outline:
          "border border-gray-300 bg-blue-200 text-gray-900 hover:bg-blue-100", // outline
        ghost: "bg-transparent text-gray-900 hover:bg-gray-100", // ghost
        create:
          "bg-emerald-500 text-white hover:bg-emerald-600 hover:cursor-pointer shadow-md hover:shadow-emerald-500/20 transition-all",
        update:
          "bg-blue-600 text-white hover:bg-blue-700 hover:cursor-pointer shadow-md hover:shadow-blue-600/30 transition-all",
        delete:
          "bg-red-500 text-white hover:bg-red-600 hover:cursor-pointer shadow-md hover:shadow-red-500/20 transition-all",
        cancel:
          "bg-gray-300 text-gray-800 hover:bg-gray-400 hover:cursor-pointer transition-all",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-2",
        lg: "h-11 px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  loadingText?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading,
      loadingText = "Carregando...",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            {loadingText}
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
