import { ReactNode } from "react";
import { Link } from "react-router-dom";

type CardAuthFormProps = {
  title: string;
  form: ReactNode;
  navButtons: {
    text: string;
    link: string;
    className: string;
    label: string;
    paragraph?: string;
  }[];
  navJustifyCenter?: boolean;
};

export const CardAuthForm = ({
  title,
  form,
  navButtons,
  navJustifyCenter = false,
}: CardAuthFormProps) => {
  return (
    <main className="flex flex-1 flex-col items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-[24rem]">
        <h1 className="text-3xl font-bold text-center text-yellow-400 mb-6">
          {title}
        </h1>
        {form}
        <nav
          className={`flex ${
            navJustifyCenter ? "justify-center" : "justify-between"
          } mt-4 text-sm text-gray-400`}
        >
          {navButtons.map((item) => (
            <p>
              {item.paragraph}
              <Link
                to={item.link}
                className={item.className}
                aria-label={item.label}
              >
                {item.text}
              </Link>
            </p>
          ))}
        </nav>
      </div>
    </main>
  );
};
