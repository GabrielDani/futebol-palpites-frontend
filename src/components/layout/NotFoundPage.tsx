// src/pages/public/NotFoundPage.tsx
import { Button } from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/ui/Card";
import { AlertTriangle } from "lucide-react";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 flex items-center justify-center min-h-screen p-4">
      <Card className="max-w-md w-full text-center">
        <div className="space-y-4">
          <AlertTriangle className="h-12 w-12 mx-auto text-yellow-400" />
          <h1 className="text-2xl font-bold">Página não encontrada</h1>
          <p className="text-gray-400">
            A página que você está tentando acessar não existe ou foi movida.
          </p>
          <Button
            onClick={() => navigate(-1)}
            variant="default"
            className="mt-4"
          >
            Voltar
          </Button>
        </div>
      </Card>
    </div>
  );
};
