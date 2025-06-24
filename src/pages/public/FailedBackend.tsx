import { Link } from "react-router-dom";
import { PageLayout } from "../../components/layout/PageLayout";
import { Section } from "../../components/ui/Section";

export const FailedBackend = () => {
  return (
    <PageLayout>
      <Section className="min-h-[70vh] flex flex-col items-center justify-center text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Estamos em Manutenção
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Nosso servidor está temporariamente fora do ar para manutenção.
            <br />
            Por favor, tente novamente mais tarde.
          </p>
          <div className="flex justify-center">
            <Link
              to="/"
              className={
                "px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200"
              }
            >
              Voltar ao início
            </Link>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
};
