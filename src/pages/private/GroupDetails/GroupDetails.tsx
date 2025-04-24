import { useParams } from "react-router-dom";
import { PageLayout } from "../../../components/layout/PageLayout";
import { Section } from "../../../components/ui/Section";
import { GroupInfoCard } from "./components/GroupInfoCard";
import { MembersTable } from "./components/MembersTable";
import { RankingTable } from "./components/RankingTable";
import { GroupActions } from "./components/GroupActions";
import { useAuth } from "../../../hooks/useAuth";
import { useGroupDetails } from "../../../hooks/useGroupDetails";
import { useGroupDetailsActions } from "../../../hooks/useGroupDetailsActions";

export const GroupDetails = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const { user } = useAuth();
  const { group, loading, error, refresh } = useGroupDetails(groupId || "");
  const { isLeaving, actionError, leaveGroup } = useGroupDetailsActions(
    groupId || "",
    refresh
  );

  if (loading) {
    return (
      <PageLayout>
        <>Carregando Grupos...</>
      </PageLayout>
    );
  }

  if (error || !group) {
    return (
      <PageLayout>
        <>Grupo não encontrado</>
      </PageLayout>
    );
  }

  const isOwner = group.createdBy.id === user?.id;

  return (
    <PageLayout>
      <Section
        bgColor="transparent"
        gridClass="grid grid-cols-1"
        spacing={{ padding: "py-8 px-4", gap: "gap-6" }}
      >
        <h1 className="text-3xl font-bold text-center text-yellow-400">
          {group.name}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <GroupInfoCard group={group} />

            <RankingTable ranking={group.ranking} />

            <MembersTable members={group.members} />
          </div>

          <div className="space-y-6">
            <GroupActions
              isLeaving={isLeaving}
              error={actionError}
              onLeave={leaveGroup}
              isOwner={isOwner}
            />

            {/* Espaço para outros componentes como convites, estatísticas, etc. */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-100 mb-4">
                Estatísticas do Grupo
              </h2>
              {/* Adicione gráficos ou outras estatísticas aqui */}
            </div>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
};
