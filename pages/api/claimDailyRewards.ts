import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/client";
import { differenceInCalendarDays, parseISO, isToday } from "date-fns";

const fetchUserData = async (ethereumAddress: string) => {
  return await prisma.user.findUnique({
    where: { ethereumAddress },
    select: {
      totalPoints: true,
      lastRewardClaimedAt: true,
      currentRewardDay: true,
      mints: {
        select: {
          updatedAt: true,
        },
      },
      bridges: {
        select: {
          updatedAt: true,
        },
      },
    },
  });
};

const checkIfUserClaimedRewardToday = (user: any) => {
  if (!user.lastRewardClaimedAt) {
    return false;
  }

  return isToday(new Date(user.lastRewardClaimedAt));
};

const calculateNextReward = (user: any) => {
  const today = new Date();
  const lastClaimedDate = parseISO(user.lastRewardClaimedAt.toISOString());
  const daysDifference = differenceInCalendarDays(today, lastClaimedDate);

  let nextRewardDay = user.currentRewardDay;

  if (daysDifference > 1) {
    nextRewardDay = 1;
  } else if (daysDifference === 1) {
    nextRewardDay = nextRewardDay;
  } else {
    nextRewardDay = 1;
  }
  return nextRewardDay;
};

const calculateNextDayRewardDay = (dailyReward: any) => {
  const claimedRewardDay = dailyReward.day;
  let nextRewardDay = claimedRewardDay < 8 ? claimedRewardDay + 1 : 8;
  return nextRewardDay;
};

const isValidRewardDay = (user: any, day: number) => {
  const mintedToday = isToday(new Date(user.mints.updatedAt));
  const bridgedToday = isToday(new Date(user.bridges.updatedAt));
  if (day === 3) {
    return mintedToday
      ? { message: "Success", isValid: true }
      : {
          message: "You should mint at least once today to claim this reward",
          isValid: false,
        };
  } else if (day === 5) {
    return bridgedToday
      ? { message: "Success", isValid: true }
      : {
          message: "You should bridge at least once today to claim this reward",
          isValid: false,
        };
  } else if (day === 7) {
    return mintedToday && bridgedToday
      ? { message: "Success", isValid: true }
      : {
          message:
            "You should mint and bridge at least once today to claim this reward",
          isValid: false,
        };
  } else {
    return { message: "Success", isValid: true };
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { ethereumAddress } = req.body;

  try {
    const user = await fetchUserData(ethereumAddress);

    if (!user) {
      console.error("User not found");
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // Check if the user has already claimed their reward today
    if (checkIfUserClaimedRewardToday(user)) {
      console.error("Reward already claimed today");
      return res.status(400).json({
        status: "error",
        message: "Reward already claimed today",
      });
    }

    // Calculate the new reward day
    const claimRewardDay = calculateNextReward(user);

    const { message, isValid } = isValidRewardDay(user, claimRewardDay);

    if (!isValid) {
      console.error(message);
      return res.status(400).json({
        status: "error",
        message: message,
      });
    }

    // Fetch the daily reward for the new reward day
    const dailyReward = await prisma.dailyReward.findUnique({
      where: { day: claimRewardDay },
    });

    const nextRewardDay = calculateNextDayRewardDay(dailyReward);

    if (!dailyReward) {
      console.error("Daily reward not found");
      return res.status(400).json({
        status: "error",
        message: "Error claiming reward",
      });
    }

    // Update the user's total points and current reward day
    const updatedUser = await prisma.user.update({
      where: { ethereumAddress },
      data: {
        totalPoints: {
          increment: dailyReward.points,
        },
        currentRewardDay: nextRewardDay,
        lastRewardClaimedAt: new Date(),
      },
    });

    // TODO: Add logic to record this in UserDailyReward table
    console.log("Reward claimed successfully");
    res.status(200).json({
      status: "success",
      message: "Reward claimed successfully",
      data: {
        dailyReward,
        newRewardDay: updatedUser.currentRewardDay,
        lastRewardClaimedAt: new Date(),
        totalPoints: updatedUser.totalPoints,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}
