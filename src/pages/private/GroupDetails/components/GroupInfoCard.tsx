import { Group } from "../../../../types/group";

export const GroupInfoCard = ({ group }: { group: Group }) => (
  <div className="bg-gray-800 rounded-lg p-6 mb-6">
    <h2 className="text-xl font-semibold text-gray-100">
      Informações do Grupo
    </h2>
    <p className="text-gray-400 text-sm">
      ({group.isPublic ? "Público" : "Privado"})
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <p className="text-gray-400">
          Adm: <span className="text-gray-100">{group.createdBy.nickname}</span>
        </p>
      </div>
      <div>
        <p className="text-gray-400">
          Membros: <span className="text-gray-100">{group.memberCount}</span>
        </p>
      </div>
    </div>
  </div>
);
