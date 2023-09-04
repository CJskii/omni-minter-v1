import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const dailyRewards = await prisma.dailyReward.findMany({
      orderBy: {
        day: "asc",
      },
    });
    console.log(`Daily rewards fetched`);
    res.status(200).json({
      status: "exists",
      message: "Daily rewards fetched successfully",
      data: dailyRewards,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}
