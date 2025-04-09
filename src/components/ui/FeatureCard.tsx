import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type FeatureCardProps = {
  title: string;
  description: string;
  highlightColor?: string;
  children?: ReactNode;
  to?: string;
  onClick?: () => void;
};

export const FeatureCard = ({
  title,
  description,
  highlightColor = "text-yellow-400",
  children,
  to,
  onClick,
}: FeatureCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`bg-gray-700 rounded-2xl p-6 shadow-lg ${
        to || onClick
          ? "hover:bg-gray-600 transition-colors cursor-pointer"
          : ""
      }`}
      onClick={handleClick}
    >
      <h2 className={`text-xl font-semibold ${highlightColor} mb-2`}>
        {title}
      </h2>
      <p className="text-zinc-300 text-sm">{description}</p>
      {children}
      {to && (
        <div className="mt-3 flex justify-end">
          <ArrowRight className="text-gray-400 w-4 h-4" />
        </div>
      )}
    </div>
  );
};
