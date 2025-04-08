import { ReactNode } from "react";
import { Header } from "./Header";

type PageLayoutProps = {
  children: ReactNode;
};

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col text-white overflow-x-hidden">
      <Header />
      {children}
    </div>
  );
};
