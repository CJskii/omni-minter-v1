import HeadComponent from "../common/components/elements/HeadComponent";
import dynamic from "next/dynamic";
import { fetchEnhancedLeaderboard } from "../common/utils/migration/fetchLeaderboard";
import { GetServerSideProps } from "next";

export interface User {
  ethereumAddress: string;
  totalPoints: number;
  inviteLink: string;
  currentRewardDay?: any;
  lastRewardClaimedAt: string;
  mints: [{ count: number }];
  bridges: [{ count: number }];
  interactions: [{ count: number }];
  streaks: [{ currentStreak: number }];
}

const LeaderboardComponent = dynamic(
  () => import("../components/Leaderboard/LeaderboardComponent"),
  {
    loading: () => <span className="loading loading-dots loading-lg"></span>,
    ssr: true,
  }
);

export const getServerSideProps = async (context: GetServerSideProps) => {
  const leaderboardData = await fetchEnhancedLeaderboard();
  return {
    props: { leaderboard: leaderboardData },
  };
};

const Leaderboard = ({ leaderboard }: { leaderboard: User[] }) => {
  return (
    <>
      <HeadComponent
        title="Mintly: Leaderboard - Discover Top Users and Their Achievements"
        description="Delve into Mintly's Leaderboard to discover top users and their achievements. Stay competitive and informed in the cross-chain space, tracking your own OFT and ONFT progress and that of peers."
      />
      <LeaderboardComponent leaderboard={leaderboard} />
    </>
  );
};

export default Leaderboard;
