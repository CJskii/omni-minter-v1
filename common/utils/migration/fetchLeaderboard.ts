import { prisma } from "../../../prisma/client";

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

export async function fetchEnhancedLeaderboard(): Promise<User[]> {
  try {
    const oldLeaderboardUsers = await prisma.user.findMany({
      take: 100,
      select: {
        ethereumAddress: true,
        totalPoints: true,
        inviteLink: true,
        currentRewardDay: true,
        lastRewardClaimedAt: true,
        mints: true,
        bridges: true,
        interactions: true,
        streaks: true,
      },
      orderBy: {
        totalPoints: "desc",
      },
    });

    // Map for additional points aggregation
    let additionalPointsMap = new Map();

    // Convert users to the desired interface format including aggregating additional points
    const enhancedLeaderboard = oldLeaderboardUsers.map((user: any) => {
      const interactionPoints = user.interactions.reduce(
        (sum: number, interaction: any) => sum + interaction.count,
        0
      );
      const additionalPoints =
        additionalPointsMap.get(user.ethereumAddress.toLowerCase()) || 0;
      const totalPoints = user.totalPoints + additionalPoints;

      return {
        ethereumAddress: user.ethereumAddress,
        totalPoints: totalPoints,
        inviteLink: user.inviteLink,
        currentRewardDay: user.currentRewardDay,
        lastRewardClaimedAt: user.lastRewardClaimedAt
          ? user.lastRewardClaimedAt.toISOString()
          : "",
        mints: [
          {
            count: user.mints.reduce(
              (sum: any, mint: { count: any }) => sum + mint.count,
              0
            ),
          },
        ],
        bridges: [
          {
            count: user.bridges.reduce(
              (sum: any, bridge: { count: any }) => sum + bridge.count,
              0
            ),
          },
        ],
        interactions: [{ count: interactionPoints }],
        streaks: user.streaks.map((streak: { currentStreak: any }) => ({
          currentStreak: streak.currentStreak,
        })),
      };
    });

    // Sort the enhanced leaderboard by total points in descending order
    enhancedLeaderboard.sort(
      (a: { totalPoints: number }, b: { totalPoints: number }) =>
        b.totalPoints - a.totalPoints
    );

    return enhancedLeaderboard.slice(0, 100);
  } catch (error) {
    console.error(error);
    return [];
  }
}
