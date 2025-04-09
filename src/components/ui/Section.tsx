import { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  gridClass?: string;
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
  gridClass,
  spacing = { padding: "py-16 px-8", gap: "gap-8" },
  bgColor = "bg-gray-800",
  textAlign = "center",
}: SectionProps) => {
  return (
    <section
      className={[spacing.padding, bgColor, `text-${textAlign}`, className]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className={`${gridClass ?? ""} ${spacing.gap} w-full max-w-7xl mx-auto`}
      >
        {children}
      </div>
    </section>
  );
};
