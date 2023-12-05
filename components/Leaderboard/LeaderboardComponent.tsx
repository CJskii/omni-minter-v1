import { useEffect, useState } from "react";
import { callLeaderboardAPI } from "../../common/utils/api/leaderboard";
import LoadingSpinner from "./Loading";
import { useAccount } from "wagmi";
import UserStats from "./Stats/UserStats";
import DailyReward from "./Rewards/DailyRewardCollapse";
import InviteUsersCollapse from "./InviteUsersCollapse";
import LeaderboardTable from "./Data/Table";
import { callUserStats } from "../../common/utils/api/userStats";
import { User as LeaderboardData } from "../../common/types/leaderboard";

// create interface for leaderboard data

// data is an array of objects
// each object has the following properties:
// address: string
// points: numbe

const LeaderboardComponent = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardData[]>([]);
  const [userData, setUserData] = useState<LeaderboardData[]>([]);
  const { address } = useAccount();

  useEffect(() => {
    fetchLeaderboard().then((data) => {
      if (data) {
        setLeaderboard(data);
      }
    });
  }, []);

  useEffect(() => {
    const filteredStats = leaderboard.filter(
      (user) => user.ethereumAddress === address
    );

    if (filteredStats.length > 0) {
      setUserData(filteredStats);
    } else {
      fetchUserStats().then((data) => {
        if (data) {
          setUserData([data]);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leaderboard, address]);

  const fetchLeaderboard = async () => {
    const response = await callLeaderboardAPI();
    const data = await response.json();
    return data.data;
  };

  const fetchUserStats = async () => {
    if (address === undefined) return;
    const response = await callUserStats(address);
    const data = await response.json();
    return data.data;
  };

  return (
    <section className="py-10 bg-base-200 sm:py-16 lg:py-24 min-w-[60vw] max-w-[95vw]">
      <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Leaderboard
          </h2>
          <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-300 flex flex-col my-4">
            <span className="text-lg">Your stats on Mintly</span>
          </p>
        </div>
        {userData.length > 0 ? (
          <>
            <UserStats filteredStats={userData} />
            {/* <ReferralLink
              inviteLink={
                filteredStats[0].inviteLink ? filteredStats[0].inviteLink : ""
              }
            /> */}
          </>
        ) : (
          <LoadingSpinner />
        )}
        {userData.length > 0 ? (
          <div className="flex flex-col justify-center items-center gap-2">
            <DailyReward
              currentRewardDay={userData[0].currentRewardDay}
              lastRewardClaimedAt={userData[0].lastRewardClaimedAt}
              setUserData={setUserData}
            />
            {userData.length > 0 ? (
              <InviteUsersCollapse
                inviteLink={
                  userData[0].inviteLink ? userData[0].inviteLink : ""
                }
              />
            ) : (
              <></>
            )}
          </div>
        ) : (
          <LoadingSpinner />
        )}
        {leaderboard.length > 0 ? (
          <LeaderboardTable leaderboard={leaderboard} />
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};

export default LeaderboardComponent;
