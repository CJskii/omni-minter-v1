import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, ethereumAddress } = req.body;

  if (req.method !== "POST") {
    return res.status(405).end();
  }

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  if (!ethereumAddress) {
    return res.status(400).json({ error: "Ethereum address is required" });
  }

  try {
    await subscribeEmail(email, ethereumAddress);
    return res.status(201).json({ error: "Verification email sent" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: (error as any).message || (error as any).toString() });
  }
}

const subscribeEmail = async (email: string, ethereumAddress: string) => {
  // TODO: Add email to Mailing List
};
