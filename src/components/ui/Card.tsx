import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const cardVariants = cva("rounded-2xl text-center", {
  variants: {
    variant: {
      default: "bg-gray-700 shadow-sm shadow-gray-600 text-yellow-400",
      elevated: "shadow-md",
      ghost: "border border-transparent shadow-none",
      dark: "bg-indigo-900/80 text-indigo-100",
    },
    padding: {
      none: "p-0",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    },
    clickable: {
      true: "group cursor-pointer transition-colors hover:bg-gray-600",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "md",
    clickable: false,
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, clickable, onClick, ...props }, ref) => {
    const Comp = props.asChild ? React.Fragment : "div";

    return (
      <Comp
        ref={ref}
        className={cn(
          cardVariants({
            variant,
            padding,
            clickable: !!onClick || clickable,
            className,
          })
        )}
        onClick={onClick}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";
