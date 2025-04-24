import { AlertTriangle } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/Button";

interface ErrorAlertProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorAlert = ({
  message,
  onRetry,
  className,
}: ErrorAlertProps) => {
  return (
    <div className={cn("bg-red-500/10 p-4 rounded-lg", className)}>
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
        <div className="flex-1">
          <p className="text-red-700 font-medium">{message}</p>
          {onRetry && (
            <Button
              variant="destructive"
              size="sm"
              className="mt-3"
              onClick={onRetry}
            >
              Tentar novamente
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
