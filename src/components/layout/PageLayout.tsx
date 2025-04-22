import { ReactNode } from "react";
import { Header, HeaderProps } from "./Header";
import { useRouteType } from "../../hooks/useRouteType";
import { RouteType } from "../../types/route";
import { FiLogOut } from "react-icons/fi";

const adminHeaderConfig: HeaderProps = {
  logo: (
    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-indigo-600 text-white font-bold">
      🛡️
    </div>
  ),
  title: { title: "Painel Admin", link: "/admin" },
  navItems: [
    { label: "Dashboard", path: "/admin" },
    { label: "Partidas", path: "/admin/matches" },
    { label: "Usuários", path: "/admin/users" },
    {
      label: "Voltar",
      path: "/dashboard",
      icon: (
        <FiLogOut className="text-lg opacity-90 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
      ),
      className:
        "flex items-center text-gray-300 hover:text-red-400 hover:cursor-pointer transition-colors duration-100 group",
    },
  ],
  headerClassName:
    "sticky top-0 z-50 bg-indigo-900 border-b border-indigo-700 backdrop-blur-sm bg-opacity-90",
  containerClassName: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
};

const authenticatedHeaderConfig: HeaderProps = {
  logo: (
    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-yellow-500 text-gray-900 font-bold">
      ⚽
    </div>
  ),
  title: { title: "Bolão de Futebol", link: "/dashboard" },
  navItems: [
    { label: "Início", path: "/" },
    { label: "Partidas", path: "/matches" },
    { label: "Ranking", path: "/ranking" },
    {
      label: "Admin",
      path: "/admin",
      isOnlyAdmin: true,
      className:
        "px-3 py-2 rounded-md text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-950 transition-colors duration-200",
    },
  ],
  headerClassName:
    "sticky top-0 z-50 bg-gray-900 border-b border-gray-700 backdrop-blur-sm bg-opacity-90",
  containerClassName: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
  hasLogout: true,
};

const guestHeaderConfig: HeaderProps = {
  logo: (
    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-yellow-500 text-gray-900 font-bold">
      ⚽
    </div>
  ),
  title: { title: "Bolão de Futebol", link: "/" },
  navItems: [
    { label: "Entrar", path: "/login" },
    {
      label: "Criar Conta",
      path: "/register",
      className:
        "px-2 py-2 rounded-lg text-sm font-medium text-gray-900 bg-yellow-400 hover:bg-yellow-500 transition-colors duration-200",
    },
  ],
  headerClassName:
    "sticky top-0 z-50 bg-gray-900 border-b border-gray-700 backdrop-blur-sm bg-opacity-90",
  containerClassName: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
};

type PageLayoutProps = {
  children: ReactNode;
  headerConfig?: HeaderProps;
  layoutClassName?: string;
  mainContentClassName?: string;
  contentContainerClassName?: string;
  showHeader?: boolean;
};

export const PageLayout = ({
  children,
  layoutClassName,
  mainContentClassName = "flex flex-col flex-1 px-6 w-full",
  contentContainerClassName = "max-w-7xl mx-auto",
  showHeader = true,
}: PageLayoutProps) => {
  const { routeType } = useRouteType();

  // Seleciona a configuração base completa
  const getBaseConfig = (): HeaderProps => {
    switch (routeType) {
      case RouteType.ADMIN:
        return adminHeaderConfig;
      case RouteType.PRIVATE:
        return authenticatedHeaderConfig;
      case RouteType.PUBLIC:
      default:
        return guestHeaderConfig;
    }
  };

  const getLayoutClass = () => {
    switch (routeType) {
      case RouteType.ADMIN:
        return (
          layoutClassName ||
          "min-h-screen bg-indigo-950 flex flex-col text-white overflow-x-hidden"
        );
      default:
        return (
          layoutClassName ||
          "min-h-screen bg-gray-900 flex flex-col text-white overflow-x-hidden"
        );
    }
  };

  console.log("[PageLayout] RouteType:", routeType);
  return (
    <div className={getLayoutClass()}>
      {showHeader && <Header {...getBaseConfig()} />}
      <main className={`${mainContentClassName} ${contentContainerClassName}`}>
        {children}
      </main>
    </div>
  );
};
