import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const leaderboard = await prisma.user.findMany({
    orderBy: { totalPoints: "desc" },
    take: 10,
    select: {
      ethereumAddress: true,
      totalPoints: true,
      leaderboardRank: true,
    },
  });

  res.json(leaderboard);
}
