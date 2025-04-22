export interface DashboardMetrics {
  todayMatches: number;
  usersCount: {
    actual: number;
    changeFromLastWeek: number;
  };
  teamsCount: number;
}
