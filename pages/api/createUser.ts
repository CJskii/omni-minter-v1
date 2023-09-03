import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { ethereumAddress, refLink } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { ethereumAddress },
    });

    if (existingUser) {
      console.error("User already exists");
      return res
        .status(200)
        .json({ status: "exists", message: "User already exists" });
    }

    const referrer = await isValidRefLink(refLink);

    if (!referrer) {
      console.error("Invalid referral link");
      return res
        .status(400)
        .json({ status: "error", message: "Invalid referral link" });
    }

    // Create the new user with the referral link
    const newUser = await prisma.user.create({
      data: {
        ethereumAddress,
        inviteLink: generateInviteLink(),
        invitedById: referrer.ethereumAddress, // Set the referrer's ethereumAddress as invitedById
      },
    });
    console.log(`New user created`);
    return res.status(201).json(newUser); // 201 means Created
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
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

async function isValidRefLink(refLink: string | null) {
  if (refLink != null) {
    const referrer = await prisma.user.findUnique({
      where: { inviteLink: refLink },
    });
    return referrer ? referrer : null;
  } else {
    return null;
  }
}
