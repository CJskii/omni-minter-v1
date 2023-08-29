import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/client";

const fetchUserData = async (ethereumAddress: string) => {
  return await prisma.user.findUnique({
    where: { ethereumAddress },
    select: {
      totalPoints: true,
      mints: {
        select: { id: true, count: true, updatedAt: true },
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

const calculatePoints = (user: any) => {
  let pointsToAdd = 100; // 100 points for minting
  const today = new Date().toDateString();
  const lastInteractionDate = user.interactions[0]?.updatedAt.toDateString();

  if (lastInteractionDate !== today) {
    pointsToAdd += 20; // 20 points for daily interaction
  }

  return pointsToAdd;
};

const handleStreaks = (user: any) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  let streak = user.streaks[0]?.currentStreak || 0;

  const lastInteractionDate = user.interactions[0]?.updatedAt.toDateString();
  if (lastInteractionDate === yesterday.toDateString()) {
    streak += 1;
  } else if (lastInteractionDate !== new Date().toDateString()) {
    streak = 1; // Reset streak
  }

  return streak;
};

const updateUserData = async (ethereumAddress: string, updateData: any) => {
  await prisma.user.update({
    where: { ethereumAddress },
    data: updateData,
  });
};

const handleReferral = async (ethereumAddress: string) => {
  const user = await prisma.user.findUnique({
    where: { ethereumAddress },
    select: { invitedById: true, mints: true },
  });

  // If the user doesn't exist or wasn't referred by anyone, exit early
  if (!user || !user.invitedById) {
    return { isValidReferral: false, referrerAddress: null };
  }

  // Check if the user has minted before
  if (user.mints && user.mints.length > 0) {
    return { isValidReferral: false, referrerAddress: null }; // User has already minted before, so we shouldn't award referral points again
  }

  // If the user was referred and is minting for the first time, award the referrer
  await awardReferralPoints(user.invitedById);

  return { isValidReferral: true, referrerAddress: user.invitedById };
};

const awardReferralPoints = async (referrerAddress: string) => {
  const referrer = await prisma.user.findUnique({
    where: { ethereumAddress: referrerAddress },
    select: { totalPoints: true, inviteCount: true },
  });

  if (referrer) {
    const REFERRAL_POINTS = calculateReferralPoints(referrer.inviteCount);
    await prisma.user.update({
      where: { ethereumAddress: referrerAddress },
      data: {
        totalPoints: referrer.totalPoints + REFERRAL_POINTS,
        inviteCount: referrer.inviteCount + 1,
      },
    });
    console.log(`${REFERRAL_POINTS} Referral points awarded`);
  }
};

const calculateReferralPoints = (inviteCount: number) => {
  if (inviteCount <= 5) {
    return 100;
  } else if (inviteCount <= 10) {
    return 150;
  } else {
    return 200;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { ethereumAddress, isInvited, referredBy } = req.body;

  try {
    // Fetch the user and related data
    const user = await fetchUserData(ethereumAddress);
    const pointsToAdd = calculatePoints(user);
    const streak = handleStreaks(user);

    // Update user points, mint counter, interactions, and streaks
    const updateData: any = {
      totalPoints: user.totalPoints + pointsToAdd,
    };
    console.log("isInvited", isInvited);
    console.log("referredBy", referredBy);
    if (isInvited) {
      const { isValidReferral, referrerAddress } = await handleReferral(
        ethereumAddress
      );
      if (isValidReferral && referrerAddress) {
        updateData.totalPoints += 100;
        updateData.invitedById = referrerAddress;
      }
    }

    if (user.mints.length) {
      updateData.mints = {
        update: {
          where: { id: user.mints[0].id },
          data: { updatedAt: new Date(), count: user.mints[0].count + 1 },
        },
      };
    } else {
      updateData.mints = {
        create: { updatedAt: new Date(), count: 1 },
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

    await updateUserData(ethereumAddress, updateData);
    res.status(200).json({ message: "Mint recorded and points awarded" });
  } catch (error) {
    console.error("Error in /api/mint:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: (error as any).message,
    });
  }
}
