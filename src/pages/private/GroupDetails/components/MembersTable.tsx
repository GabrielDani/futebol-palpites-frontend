import { User } from "../../../../types/user";

export const MembersTable = ({ members }: { members: User[] }) => (
  <div className="bg-gray-800 rounded-lg p-6 mb-6">
    <h2 className="text-xl font-semibold text-gray-100 mb-4">Membros</h2>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b border-gray-700">
            <th className="p-3">Nome</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr
              key={member.id}
              className="border-b border-gray-700 hover:bg-gray-700/50"
            >
              <td className="p-3 flex items-center gap-2">
                <span>{member.nickname}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
