import { useEffect, useState } from "react";
import { callLeaderboardAPI } from "../../utils/api/callLeaderboardAPI";
import LoadingSpinner from "./Loading";
import { useAccount } from "wagmi";
import UserStats from "./Stats/UserStats";
import DailyReward from "./DailyRewardCollapse";
import InviteUsersCollapse from "./InviteUsersCollapse";
import ReferralLink from "./ReferralLink";
import LeaderboardTable from "./Data/Table";

// create interface for leaderboard data

// data is an array of objects
// each object has the following properties:
// address: string
// points: number

interface LeaderboardData {
  // write it here
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

  key: [any];
}

const LeaderboardComponent = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardData[]>([]);
  const { address } = useAccount();

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

  const filteredStats = leaderboard.filter(
    (user) => user.ethereumAddress === address
  );

  console.log(leaderboard);
  console.log(filteredStats[0]);

  return (
    <section className="py-10 bg-base-200 sm:py-16 lg:py-24 min-w-[60vw]">
      <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Leaderboard
          </h2>
          <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-300 flex flex-col my-4">
            <span className="text-lg">Your stats on Mintly</span>
            <span className="text-sm">
              Note: stats are recorded from 26th of August
            </span>
          </p>
        </div>
        {filteredStats.length > 0 ? (
          <>
            <UserStats filteredStats={filteredStats} />
            <ReferralLink
              inviteLink={
                filteredStats[0].inviteLink ? filteredStats[0].inviteLink : ""
              }
            />
          </>
        ) : (
          <LoadingSpinner />
        )}
        <>
          <DailyReward />
          <InviteUsersCollapse />
        </>

        <LeaderboardTable leaderboard={leaderboard} />
      </div>
    </section>
  );
};

export default LeaderboardComponent;
