import { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  gridCols?: {
    default: string; // mobile
    md?: string; // medium screens
    lg?: string; // large screens
  };
  spacing?: {
    padding?: string;
    gap?: string;
  };
  bgColor?: string;
  textAlign?: "left" | "center" | "right";
};

export const Section = ({
  children,
  className = "",
  gridCols = { default: "grid-cols-1", md: "grid-cols-3" },
  spacing = { padding: "py-16 px-8", gap: "gap-8" },
  bgColor = "bg-gray-800",
  textAlign = "center",
}: SectionProps) => {
  const gridClasses = [
    "grid",
    gridCols.default,
    gridCols.md ? `md:${gridCols.md}` : "",
    gridCols.lg ? `lg:${gridCols.lg}` : "",
    spacing.gap,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      className={[spacing.padding, bgColor, `text-${textAlign}`, className]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={`${gridClasses} w-full max-w-7xl mx-auto`}>
        {children}
      </div>
    </section>
  );
};
