// components/ui/Modal.tsx
import { ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
  closeOnOverlayClick?: boolean;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  closeOnOverlayClick = true,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      {/* Modal Content */}
      <div
        className={cn(
          "relative z-10 w-full max-w-md bg-gray-800 rounded-xl border border-gray-700 shadow-2xl overflow-hidden",
          className
        )}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h3 className="text-lg font-bold text-yellow-400">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-yellow-500 transition-colors"
              aria-label="Fechar modal"
            >
              <X size={20} />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="p-4">{children}</div>

        {/* Footer - Pode ser personalizado conforme necessidade */}
        {!title && (
          <div className="absolute top-2 right-2">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-yellow-500 transition-colors"
              aria-label="Fechar modal"
            >
              <X size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
