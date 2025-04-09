type TeamLogoProps = {
  logoUrl?: string;
  name: string;
  size?: "sm" | "md" | "lg";
};

export const TeamLogo = ({ logoUrl, name, size = "md" }: TeamLogoProps) => {
  const sizeClasses = {
    sm: "w-16 h-10",
    md: "w-24 h-14",
    lg: "w-32 h-16",
  };

  return (
    <div
      className={`flex items-center justify-center mb-1 bg-transparent rounded-md p-1 ${sizeClasses[size]}`}
    >
      <img
        src={logoUrl || "images/default-team.png"}
        alt={name}
        className="w-full h-full object-contain"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = "images/default-team.png";
          target.classList.add("opacity-80");
        }}
      />
    </div>
  );
};
