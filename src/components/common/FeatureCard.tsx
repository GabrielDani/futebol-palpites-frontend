import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";
import { Card, CardProps } from "../ui/Card";
import { cn } from "../../lib/utils";

const featureCardVariants = {
  highlight: {
    yellow: "text-yellow-400",
    gray: "text-gray-300",
    blue: "text-blue-400",
    red: "text-red-400",
    green: "text-green-400",
  },
} as const;

type FeatureCardProps = CardProps & {
  title?: string;
  description?: string;
  highlight?: keyof typeof featureCardVariants.highlight;
  actionLabel?: string;
  icon?: ReactNode;
  showActionArrow?: boolean;
};

export const FeatureCard = ({
  title,
  description,
  highlight = "yellow",
  children,
  onClick,
  actionLabel,
  icon,
  showActionArrow = true,
  className,
  ...props
}: FeatureCardProps) => {
  return (
    <Card
      onClick={onClick}
      className={cn("flex flex-col h-full", className)}
      {...props}
    >
      {icon && <div className="mb-3">{icon}</div>}

      {title && (
        <h2
          className={cn(
            "text-xl font-semibold mb-2",
            featureCardVariants.highlight[highlight]
          )}
        >
          {title}
        </h2>
      )}

      {description && (
        <p className="text-zinc-300 text-sm flex-grow">{description}</p>
      )}

      {children}

      {(onClick || actionLabel) && (
        <div className="mt-3 flex items-center justify-end gap-2 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
          {actionLabel && <span>{actionLabel}</span>}
          {showActionArrow && (onClick || actionLabel) && (
            <ArrowRight className="w-4 h-4" />
          )}
        </div>
      )}
    </Card>
  );
};
