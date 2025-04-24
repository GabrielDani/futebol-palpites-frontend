// pages/Groups.tsx
import { PageLayout } from "../../../components/layout/PageLayout";
import { Section } from "../../../components/ui/Section";
import { GroupHead } from "./components/GroupHead";
import { GroupSection } from "./components/GroupSection";
import { useGroupsData } from "../../../hooks/useGroupsData";
import { useGroupActions } from "../../../hooks/useGroupAction";
import { PrivateGroupModal } from "./components/PrivateGroupModal";

export const Groups = () => {
  const {
    publicGroups,
    privateGroups,
    userGroups,
    loading,
    error: dataError,
    refreshGroups,
  } = useGroupsData();

  const {
    selectedGroupId,
    setSelectedGroupId,
    password,
    setPassword,
    error: actionError,
    handleNavigateToGroup,
    handleJoinPublicGroup,
    handleJoinPrivateGroup,
  } = useGroupActions(refreshGroups);

  if (loading) {
    return (
      <PageLayout>
        <>Carregando Grupos...</>
      </PageLayout>
    );
  }

  if (dataError) {
    return (
      <PageLayout>
        <>Erro ao Carregar Dados.</>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Section
        bgColor="transparent"
        gridClass="grid grid-cols-1"
        spacing={{ padding: "py-8 px-4", gap: "gap-8" }}
      >
        <GroupHead />

        <Section bgColor="transparent" gridClass="grid grid-cols-3">
          {/* Meus Grupos */}
          <GroupSection
            title="Meus Grupos"
            groups={userGroups}
            isMember={true}
            onCardClick={handleNavigateToGroup}
          />

          {/* Grupos Públicos */}
          <GroupSection
            title="Grupos Públicos"
            groups={publicGroups}
            onButtonClick={handleJoinPublicGroup}
          />

          {/* Grupos Privados */}
          <GroupSection
            title="Grupos Privados"
            groups={privateGroups}
            onButtonClick={(id) => {
              setSelectedGroupId(id);
            }}
          />
        </Section>

        {/* Modal para Grupos Privados */}
        <PrivateGroupModal
          isOpen={!!selectedGroupId}
          group={privateGroups.find((g) => g.id === selectedGroupId) || null}
          password={password}
          error={actionError}
          onPasswordChange={setPassword}
          onSubmit={handleJoinPrivateGroup}
          onClose={() => {
            setSelectedGroupId(null);
            setPassword("");
          }}
        />
      </Section>
    </PageLayout>
  );
};
