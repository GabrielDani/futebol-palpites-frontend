import { PageLayout } from "../../components/layout/PageLayout";
import { Section } from "../../components/ui/Section";

export const LoadingPage = () => {
  return (
    <PageLayout>
      <Section className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="inline-block relative w-20 h-20 mb-6">
            {/* Spinner animation */}
            <div className="absolute inset-0 rounded-full border-4 border-gray-300 border-t-primary-500 animate-spin"></div>
            {/* Logo ou ícone opcional no centro do spinner */}
            <div className="absolute inset-4 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                ></path>
              </svg>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Carregando...
          </h2>
          <p className="text-gray-600">
            Aguarde enquanto preparamos tudo para você
          </p>
        </div>
      </Section>
    </PageLayout>
  );
};
