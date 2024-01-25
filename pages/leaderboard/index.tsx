import DashboardLayout from "@/components/dashboard/layout";
import LeaderboardTable from "./leaderboard-table";

export default function LeaderboardPage() {
  return (
    <DashboardLayout>
      <LeaderboardTable />
    </DashboardLayout>
  );
}
