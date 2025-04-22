import { PageLayout } from "../../../components/layout/PageLayout";
import { AdminHeader } from "../../../components/ui/admin/AdminHeader";
import { AdminCardGrid } from "../../../components/ui/admin/AdminCardGrid";
import { StatsOverview } from "../../../components/ui/admin/StatsOverview";

export const AdminDashboard = () => {
  return (
    <PageLayout>
      <AdminHeader />
      <StatsOverview />
      <AdminCardGrid />
    </PageLayout>
  );
};
