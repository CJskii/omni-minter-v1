import HeadComponent from "../common/components/elements/HeadComponent";
import dynamic from "next/dynamic";

const LeaderboardComponent = dynamic(
  () => import("../components/Leaderboard/LeaderboardComponent"),
  {
    loading: () => <span className="loading loading-dots loading-lg"></span>,
    ssr: true,
  }
);

const Leaderboard = () => {
  return (
    <>
      <HeadComponent
        title="Mintly: Leaderboard - Discover Top Users and Their Achievements"
        description="Delve into Mintly's Leaderboard to discover top users and their achievements. Stay competitive and informed in the cross-chain space, tracking your own OFT and ONFT progress and that of peers."
      />
      <LeaderboardComponent />
    </>
  );
};

export default Leaderboard;
