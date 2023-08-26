import { useEffect, useState } from "react";
import { callLeaderboardAPI } from "../../utils/api/callLeaderboardAPI";
import LoadingSpinner from "./Loading";
import LeaderboardRow from "./LeaderboardRow";

// create interface for leaderboard data

// data is an array of objects
// each object has the following properties:
// address: string
// points: number

interface LeaderboardData {
  // write it here
  ethereumAddress: string;
  totalPoints: number;
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

  key: [any];
}

const LeaderboardComponent = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardData[]>([]);

  useEffect(() => {
    fetchLeaderboard().then((data) => {
      if (data) {
        setLeaderboard(data);
      }
    });
  }, []);

  const fetchLeaderboard = async () => {
    const response = await callLeaderboardAPI();
    const data = await response.json();
    return data.data;
  };

  return (
    <section className="py-10 bg-base-200 sm:py-16 lg:py-24 min-w-[60vw]">
      <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Leaderboard
          </h2>
          <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-300">
            Compete with other users to earn the top spot
          </p>
        </div>
        <div className="flex justify-between pr-4 py-2 mt-8 ">
          <div className="flex gap-4">
            <span className="pl-2">Rank</span>
            <span className="pl-2">Wallet address</span>
          </div>

          <span className="pr-6">Points</span>
        </div>

        {leaderboard.length > 0 ? (
          leaderboard
            .filter((user) => user.totalPoints > 0)
            .map((user, index) => (
              <LeaderboardRow key={index} user={user} index={index} />
            ))
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </section>
  );
};

export default LeaderboardComponent;
