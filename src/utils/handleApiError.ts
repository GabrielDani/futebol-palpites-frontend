import { AxiosError } from "axios";

export const handleApiError = (error: unknown): string => {
  if (!(error instanceof AxiosError) || !error.response) {
    return "Erro de conexão. Verifique sua internet.";
  }

  const { status, data } = error.response;

  if (typeof data?.error === "string") {
    console.log("[handleApiError] ", data.error);
    return data.error;
  }

  switch (status) {
    case 400:
      return "Requisição inválida. Verifique os dados enviados.";
    case 401:
      return "Credenciais inválidas. Verifique seu nickname e senha.";
    case 403:
      return "Você não tem permissão para acessar essa funcionalidade.";
    case 404:
      return "Recurso não encontrado.";
    case 500:
      return "Erro no servidor. Tente novamente mais tarde.";
    default:
      return "Ocorreu um erro inesperado. Tente novamente.";
  }
};
