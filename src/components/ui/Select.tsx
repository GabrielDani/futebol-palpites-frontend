// components/ui/select.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

function getDisplayName(type: unknown): string {
  if (typeof type === "string") {
    return type; // tag HTML nativa
  }

  if (typeof type === "function" || typeof type === "object") {
    // 'as { displayName?: string; name?: string }' é seguro aqui
    const maybeComponent = type as { displayName?: string; name?: string };
    return maybeComponent.displayName || maybeComponent.name || "Unknown";
  }

  return "Unknown";
}

const selectVariants = cva(
  "flex items-center justify-between rounded-xl border border-gray-300 bg-gray-200 px-3 py-2 text-sm text-gray-800 ring-offset-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500",
  {
    variants: {
      size: {
        sm: "h-8",
        md: "h-10",
        lg: "h-12",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
);

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface SelectTriggerElement extends React.ReactElement {
  type: typeof SelectTrigger;
  props: React.ComponentProps<typeof SelectTrigger>;
}

interface SelectContentElement extends React.ReactElement {
  type: typeof SelectContent;
  props: React.ComponentProps<typeof SelectContent> & {
    children: React.ReactElement<SelectItemProps>[];
  };
}

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children?: React.ReactNode;
  isSelected?: boolean;
}

const Select = ({
  value,
  onValueChange,
  children,
  open,
  onOpenChange,
  ...props
}: SelectProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const show = open !== undefined ? open : isOpen;
  const setShow = onOpenChange || setIsOpen;

  // console.log("[Select] Render - show:", show, "value:", value);

  const handleValueChange = (val: string) => {
    console.log("[Select][handleValueChange] Valor selecionado:", val);
    onValueChange(val);
    setShow(false);
  };

  return (
    <div className="relative" data-value={value} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (getDisplayName(child.type) === "SelectTrigger") {
            const trigger = child as SelectTriggerElement;
            return React.cloneElement(trigger, {
              onClick: (e: React.MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
                setShow(!show);
              },
              "aria-expanded": show,
              type: "button",
            });
          }

          if (getDisplayName(child.type) === "SelectContent") {
            if (!show) return null;

            const content = child as SelectContentElement;
            return React.cloneElement(content, {
              children: React.Children.map(content.props.children, (item) => {
                if (
                  React.isValidElement(item) &&
                  getDisplayName(item.type) === "SelectItem"
                ) {
                  return React.cloneElement(item, {
                    onClick: (e: React.MouseEvent) => {
                      e.preventDefault();

                      handleValueChange(item.props.value);
                    },
                    isSelected: item.props.value === value,
                  });
                }
                return item;
              }),
            });
          }
        }
        return null;
      })}
    </div>
  );
};

interface SelectTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof selectVariants> {}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, size, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(selectVariants({ size }), className)}
      {...props}
    >
      {children}
    </button>
  )
);
SelectTrigger.displayName = "SelectTrigger";

const SelectValue = ({
  className,
  placeholder,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { placeholder?: string }) => (
  <span className={cn("truncate", className)} {...props}>
    {props.children || placeholder}
  </span>
);
SelectValue.displayName = "SelectValue";

interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
  onPointerDownOutside?: (e: Event) => void;
  children?: React.ReactNode;
}

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, onPointerDownOutside, ...props }, ref) => {
    const handlePointerDown = (e: React.PointerEvent) => {
      if (onPointerDownOutside) {
        onPointerDownOutside(e.nativeEvent);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "absolute z-50 mt-1 overflow-hidden rounded-md border bg-gray-200 shadow-md",
          className
        )}
        onPointerDown={handlePointerDown}
        {...props}
      >
        <div className="p-1 max-h-60 overflow-y-auto">{children}</div>
      </div>
    );
  }
);
SelectContent.displayName = "SelectContent";

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, value, children, onClick, isSelected, ...props }, ref) => {
    const itemValue = value;
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none transition-colors",
          isSelected
            ? "bg-yellow-400 text-yellow-900"
            : "hover:bg-yellow-400 hover:text-yellow-900",
          className
        )}
        onClick={onClick}
        data-value={itemValue}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SelectItem.displayName = "SelectItem";

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
