import { RegisterForm } from "../../../components/ui/auth/RegisterForm";
import { PageLayout } from "../../../components/layout/PageLayout";
import { CardAuthForm } from "../../../components/ui/auth/CardAuthForm";

const formNavButtons = [
  {
    paragraph: "Já tem uma conta? ",
    text: "Entre aqui",
    link: "/login",
    className: "text-yellow-400 hover:underline",
    label: "Recuperar senha",
  },
];

export const Register = () => {
  return (
    <PageLayout>
      <CardAuthForm
        title="Criar conta"
        form={<RegisterForm />}
        navButtons={formNavButtons}
        navJustifyCenter={true}
      />
    </PageLayout>
  );
};
