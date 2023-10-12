import HeadComponent from "../components/HeadComponent";
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
        title="Mintly Leaderboard And User Dashboard Stats"
        description="Explore the leaderboard and user dashboard stats on Mintly ONFTs."
      />
      <LeaderboardComponent />
    </>
  );
};

export default Leaderboard;
