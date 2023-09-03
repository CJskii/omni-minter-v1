import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { ethereumAddress } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        ethereumAddress: ethereumAddress,
      },
      select: {
        ethereumAddress: true,
        inviteLink: true,
        totalPoints: true,
        mints: true,
        bridges: true,
        interactions: true,
        streaks: true,
        inviteCount: true,
        currentRewardDay: true,
        lastRewardClaimedAt: true,
      },
    });
    console.log(`User stats fetched`);
    res.status(200).json({
      status: "exists",
      message: "User stats fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}
