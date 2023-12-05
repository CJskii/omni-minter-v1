import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/client";
import {
  generateVerificationToken,
  generateTokenExpiration,
} from "../../common/utils/generateToken";
import { sendVerificationEmail } from "../../common/utils/interaction/sendVerificationEmail";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { emailAddress, ethereumAddress } = req.body;

  if (req.method !== "POST") {
    return res.status(405).end();
  }

  if (!emailAddress) {
    return res.status(400).json({ error: "Email is required" });
  }

  if (!ethereumAddress) {
    return res.status(400).json({ error: "Ethereum address is required" });
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        ethereumAddress: {
          equals: ethereumAddress,
          mode: "insensitive",
        },
      },
      select: {
        email: true,
        ethereumAddress: true,
        VerificationToken: true,
        isSubscribed: true,
      },
    });

    if (existingUser) {
      // if user exists
      if (!existingUser.isSubscribed) {
        // if user exists but is not subscribed
        const verificationToken = generateVerificationToken();
        const tokenExpiration = generateTokenExpiration();
        const email = existingUser.email || emailAddress;

        await prisma.user.update({
          where: { ethereumAddress: existingUser.ethereumAddress },
          data: {
            email: email,
            VerificationToken: {
              create: {
                token: verificationToken,
                identifier: emailAddress,
                expires: tokenExpiration,
                updatedAt: new Date(),
              },
            },
          },
        });

        await sendVerificationEmail(email, verificationToken);
        console.log(
          "Verification email sent (user exists but is not subscribed)"
        );
        return res.status(200).json({
          status: "email_updated",
          message: "Verification email sent",
        });
      } else if (
        existingUser.email &&
        existingUser.email.toLowerCase() !== emailAddress.toLowerCase()
      ) {
        // if user exists and is subscribed but has different email
        return res.status(200).json({
          status: "exists_with_different_email",
          message: "User exists with different email",
        });
      }
    } else {
      // if user does not exist
      const verificationToken = generateVerificationToken();
      const tokenExpiration = generateTokenExpiration();

      const newUser = await prisma.user.create({
        data: {
          ethereumAddress: ethereumAddress,
          email: emailAddress,
          inviteLink: generateInviteLink(),
          updatedAt: new Date(),
          VerificationToken: {
            create: {
              token: verificationToken,
              identifier: emailAddress,
              expires: tokenExpiration,
            },
          },
        },
      });

      await sendVerificationEmail(emailAddress, verificationToken);
      console.log("Verification email sent (user does not exist)");
      return res.status(201).json({ status: "user_created", newUser });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: (error as any).message || (error as any).toString() });
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
