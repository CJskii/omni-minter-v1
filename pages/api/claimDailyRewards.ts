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
    const dailyReward = await prisma.DailyReward.findMany({
      where: {
        day: rewardDay,
      },
    });

    if (dailyReward.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Error claiming reward",
      });
    }
    // TODO: Check if user has already claimed reward for this day
    // TODO: Claim reward logic

    const user = await prisma.user.findFirst({
      where: {
        ethereumAddress: ethereumAddress,
      },
      select: {
        totalPoints: true,
      },
    });

    res.status(200).json({
      status: "exists",
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
