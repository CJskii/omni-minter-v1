import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { ethereumAddress, rewardDay } = req.body;

  try {
    // Fetch the daily reward for the given day
    const dailyReward = await prisma.dailyReward.findUnique({
      where: { day: rewardDay },
    });

    if (!dailyReward) {
      return res.status(400).json({
        status: "error",
        message: "Error claiming reward",
      });
    }

    // Update the user's total points and current reward day
    let newRewardDay = rewardDay === 8 ? 8 : rewardDay + 1;

    await prisma.user.update({
      where: { ethereumAddress },
      data: {
        totalPoints: {
          increment: dailyReward.points,
        },
        currentRewardDay: newRewardDay,
        lastRewardClaimedAt: new Date(),
      },
    });

    // TODO: Add logic to record this in UserDailyReward table

    res.status(200).json({
      status: "success",
      message: "Reward claimed successfully",
      data: dailyReward,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}
