import { useAuth } from "../../../hooks/useAuth";

export const AdminHeader = () => {
  const { user } = useAuth();
  return (
    <div className="px-4 py-4 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-100">
          Área Administrativa
        </h1>
        <p className="text-lg text-gray-500">Painel de controle completo</p>
        <p className="text-sm font-semibold text-yellow-400">
          {user?.nickname}
        </p>
      </div>
    </div>
  );
};
