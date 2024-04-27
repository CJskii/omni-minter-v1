import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ status: "error", message: "Method Not Allowed" });
  }

  const { ethereumAddress } = req.body;

  if (!ethereumAddress) {
    return res
      .status(400)
      .json({ status: "error", message: "Ethereum address is required" });
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        ethereumAddress: {
          equals: ethereumAddress,
          mode: "insensitive",
        },
        select: {
          totalPoints: true,
          ethereumAddress: true,
          mints: true,
          bridges: true,
          inviteCount: true,
        },
      },
    });

    if (existingUser) {
      return res.status(200).json({ status: "exists", user: existingUser });
    } else {
      return res
        .status(404)
        .json({ status: "new", message: "User does not exist" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
}
