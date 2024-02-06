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
        ethereumAddress: {
          equals: ethereumAddress,
          mode: "insensitive",
        },
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
    const userAccount = await prisma.account.findFirst({
      where: {
        ethereumAddress: ethereumAddress.toLowerCase(),
      },
      select: {
        Interaction: true,
      },
    });

    const mintCount = userAccount.Interaction.filter(
      (interaction: any) => interaction.type === "MINT"
    ).length;

    const mintPoints = userAccount.Interaction.filter(
      (interaction: any) => interaction.type === "MINT"
    ).reduce((sum: number, interaction: any) => sum + interaction.points, 0);

    const bridgeCount = userAccount.Interaction.filter(
      (interaction: any) => interaction.type === "BRIDGE"
    ).length;

    const bridgePoints = userAccount.Interaction.filter(
      (interaction: any) => interaction.type === "BRIDGE"
    ).reduce((sum: number, interaction: any) => sum + interaction.points, 0);

    user.mints[0].count = [user.mints[0].count + mintCount];
    user.bridges[0].count = [user.bridges[0].count + bridgeCount];
    user.totalPoints = user.totalPoints + mintPoints + bridgePoints;

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
