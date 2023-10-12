import LeaderboardComponent from "../components/Leaderboard/LeaderboardComponent";
import HeadComponent from "../components/HeadComponent";

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
