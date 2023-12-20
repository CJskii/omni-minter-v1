import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/client";

const fetchUserData = async (ethereumAddress: string) => {
  return await await prisma.user.findFirst({
    where: {
      ethereumAddress: {
        equals: ethereumAddress,
        mode: "insensitive",
      },
    },
    select: {
      ethereumAddress: true,
      totalPoints: true,
      bridges: {
        select: {
          id: true,
          count: true,
          updatedAt: true,
          wormholeCount: true,
          layerzeroCount: true,
        },
      },
      interactions: {
        select: { id: true, updatedAt: true, count: true },
      },
      streaks: {
        select: { id: true, currentStreak: true, updatedAt: true },
      },
    },
  });
};

const calculatePoints = (user: any, streak: any) => {
  let pointsToAdd = 50; // 50 points for bridging
  const currentStreak = streak ? streak : 1;
  const today = new Date().toDateString();
  const lastInteractionDate = user.interactions.length
    ? user.interactions[0]?.updatedAt.toDateString()
    : null;
  if (lastInteractionDate !== today) {
    if (currentStreak === 0) {
      pointsToAdd += 20; // Default 20 points if no streak data
    } else if (currentStreak >= 1 && currentStreak <= 7) {
      pointsToAdd += 20;
    } else if (currentStreak >= 8 && currentStreak <= 14) {
      pointsToAdd += 40;
    } else if (currentStreak >= 15 && currentStreak <= 30) {
      pointsToAdd += 75;
    } else if (currentStreak > 30) {
      pointsToAdd += 100;
    }
  }
  return pointsToAdd;
};

const handleStreaks = (user: any) => {
  const today = new Date().toDateString();
  const lastInteractionDate = user.interactions.length
    ? user.interactions[0]?.updatedAt.toDateString()
    : null;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  let streak = user.streaks.length ? user.streaks[0].currentStreak : 0;
  if (lastInteractionDate === yesterday.toDateString()) {
    streak += 1;
  } else if (lastInteractionDate !== today) {
    streak = 1; // Reset streak
  }
  return streak;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { ethereumAddress, bridgeType } = req.body;

  if (!ethereumAddress || !bridgeType) {
    console.error("Missing parameters");
    return res.status(400).json({ message: "Missing parameters" });
  }

  try {
    const user = await fetchUserData(ethereumAddress);
    if (!user) {
      console.error("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const streak = handleStreaks(user);
    const pointsToAdd = calculatePoints(user, streak);

    const updateData: any = {
      totalPoints: user.totalPoints + pointsToAdd,
    };

    if (user.bridges.length) {
      updateData.bridges = {
        update: {
          where: { id: user.bridges[0].id },
          data: {
            updatedAt: new Date(),
            count: user.bridges[0].count + 1,
            [`${bridgeType}Count`]: user.bridges[0][`${bridgeType}Count`] + 1,
          },
        },
      };
    } else {
      updateData.bridges = {
        create: { updatedAt: new Date(), count: 1, [`${bridgeType}Count`]: 1 },
      };
    }

    if (user.interactions.length) {
      updateData.interactions = {
        update: {
          where: { id: user.interactions[0].id },
          data: {
            updatedAt: new Date(),
            count: user.interactions[0].count + 1,
          },
        },
      };
    } else {
      updateData.interactions = {
        create: { updatedAt: new Date(), count: 1 },
      };
    }

    if (user.streaks.length) {
      updateData.streaks = {
        update: {
          where: { id: user.streaks[0].id },
          data: { currentStreak: streak, updatedAt: new Date() },
        },
      };
    } else {
      updateData.streaks = {
        create: {
          currentStreak: streak,
          updatedAt: new Date(),
          startDate: new Date(),
        },
      };
    }

    await prisma.user.update({
      where: {
        ethereumAddress: user.ethereumAddress,
      },
      data: updateData,
    });
    console.log("Bridge recorded and points awarded");
    res.status(200).json({ message: "Bridge recorded and points awarded" });
  } catch (error) {
    console.error("Error in /api/bridge:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: (error as any).message,
    });
  }
}
