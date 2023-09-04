import LeaderboardRow from "./LeaderboardRow";
import LoadingSpinner from "../Loading";

interface User {
  ethereumAddress: string;
  totalPoints: number;
  inviteLink: string;
  mints: [
    {
      count: number;
    }
  ];
  bridges: [
    {
      count: number;
    }
  ];
  interactions: [
    {
      count: number;
    }
  ];
  streaks: [
    {
      currentStreak: number;
    }
  ];
}

interface LeaderboardData {
  leaderboard: User[];
}

const LeaderboardTable = (props: LeaderboardData) => {
  const { leaderboard } = props;
  return (
    <>
      {leaderboard.length > 0 ? (
        <div>
          <div className="flex justify-between pr-4 py-2 mt-8 ">
            <div className="flex gap-4">
              <span className="pl-2">Rank</span>
              <span className="pl-2">Wallet address</span>
            </div>

            <span className="pr-6">Level</span>
          </div>
          {leaderboard
            .filter((user: User) => user.totalPoints > 0)
            .map((user: User, index: number) => (
              <LeaderboardRow key={index} user={user} index={index} />
            ))}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default LeaderboardTable;
