import { Link } from "react-router-dom";
import { ReactNode } from "react";
import { LogoutButton } from "../ui/LogoutButton";
import { useAuth } from "../../hooks/useAuth";

export type HeaderProps = {
  logo: ReactNode;
  title: {
    title: string;
    link: string;
  };
  navItems: {
    path: string;
    label: string;
    icon?: ReactNode;
    className?: string;
    isOnlyAdmin?: boolean;
  }[];
  headerClassName?: string;
  containerClassName?: string;
  hasLogout?: boolean;
};

export const Header = ({
  logo,
  title,
  navItems,
  headerClassName,
  containerClassName = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
  hasLogout = false,
}: HeaderProps) => {
  const { user } = useAuth();
  return (
    <header className={`${headerClassName} mb-8`}>
      <div className={containerClassName}>
        <div className="flex h-16 items-center justify-between">
          {/* Logo e Título */}
          <Link
            to={title.link}
            className="flex items-center gap-2 group"
            aria-label="Página inicial"
          >
            <span className="group-hover:bg-gray-800 rounded-full">{logo}</span>
            <h1 className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-200">
              {title.title}
            </h1>
          </Link>

          {/* Navegação */}
          <nav className="flex items-center space-x-6">
            {navItems.map((item) => {
              if (item.isOnlyAdmin && user?.role !== "ADMIN") return null;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={
                    item.className ??
                    "px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200"
                  }
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                </Link>
              );
            })}

            {/* Botão de Logout */}
            {hasLogout ? <LogoutButton /> : null}
          </nav>
        </div>
      </div>
    </header>
  );
};
