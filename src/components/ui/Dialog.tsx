// components/ui/dialog.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const dialogOverlayVariants = cva(
  "fixed inset-0 z-50 bg-indigo-900/50 transition-all duration-100",
  {
    variants: {
      blur: {
        sm: "backdrop-blur-sm",
        md: "backdrop-blur-md",
        lg: "backdrop-blur-lg",
      },
    },
    defaultVariants: {
      blur: "sm",
    },
  }
);

const dialogContentVariants = cva(
  "fixed z-50 grid w-full gap-4 bg-gray-100 p-8 shadow-xl duration-200",
  {
    variants: {
      position: {
        center: "left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]",
        top: "left-[50%] top-4 translate-x-[-50%]",
        bottom: "left-[50%] bottom-4 translate-x-[-50%]",
      },
      size: {
        sm: "max-w-sm rounded-lg",
        md: "max-w-md rounded-xl",
        lg: "max-w-lg rounded-xl",
        xl: "max-w-xl rounded-2xl",
        full: "max-w-[95vw] rounded-2xl",
      },
    },
    defaultVariants: {
      position: "center",
      size: "md",
    },
  }
);

interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
}

const Dialog = ({ open, onClose, children, ...props }: DialogProps) => {
  return (
    open && (
      <div {...props}>
        <div className={dialogOverlayVariants()} onClick={onClose} />
        {children}
      </div>
    )
  );
};

const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof dialogContentVariants>
>(({ className, position, size, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(dialogContentVariants({ position, size }), className)}
    {...props}
  />
));
DialogContent.displayName = "DialogContent";

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 sm:text-left md:text-center",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn("text-lg font-bold leading-none tracking-tight", className)}
    {...props}
  />
);
DialogTitle.displayName = "DialogTitle";

export { Dialog, DialogContent, DialogHeader, DialogTitle };
