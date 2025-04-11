import { LoginForm } from "../../../components/ui/auth/LoginForm";
import { PageLayout } from "../../../components/layout/PageLayout";
import { CardAuthForm } from "../../../components/ui/auth/CardAuthForm";

const formNavButtons = [
  {
    text: "Esqueci minha senha",
    link: "#",
    className: "hover:text-white transition-colors",
    label: "Recuperar senha",
  },
  {
    text: "Cadastrar-se",
    link: "/register",
    className: "hover:text-white transition-colors",
    label: "Criar nova conta",
  },
];

export const Login = () => {
  return (
    <PageLayout>
      <CardAuthForm
        title="Bolão de Futebol"
        form={<LoginForm />}
        navButtons={formNavButtons}
      />
    </PageLayout>
  );
};
