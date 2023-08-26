import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  //const { ethereumAddress } = req.body;

  try {
    const leaderboard = await prisma.user.findMany({
      // fetch 100 users with the highest score
      take: 100,
      select: {
        ethereumAddress: true,
        totalPoints: true,
        mints: true,
        bridges: true,
        interactions: true,
        streaks: true,
      },
      orderBy: {
        totalPoints: "desc",
      },
    });

    res.status(200).json({
      status: "exists",
      message: "Leaderboard fetched successfully",
      data: leaderboard,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}
