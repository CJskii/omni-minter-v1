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
    const existingUser = await prisma.user.findUnique({
      where: { ethereumAddress },
    });

    if (!existingUser) {
      const newUser = await prisma.user.create({
        data: {
          ethereumAddress,
          inviteLink: generateInviteLink(),
        },
      });
      return res.status(201).json(newUser); // 201 means Created
    }

    res.status(200).json({ status: "exists", message: "User already exists" });
  } catch (error) {
    console.error(error);
  }
}

function generateInviteLink(): string {
  const referralCodes = require("referral-codes");
  const code = referralCodes.generate({
    length: 10,
    count: 1,
  });
  return code[0];
}
