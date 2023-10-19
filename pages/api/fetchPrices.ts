import { NextApiRequest, NextApiResponse } from "next";

let cache: any = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const API_URL = process.env.NEXT_PUBLIC_PRICE_API_URL;
  if (!API_URL) {
    return res.status(500).json({ error: "API URL IS NULL" });
  }

  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const response = await fetch(API_URL as string);
    if (response.ok) {
      console.log("Fetching prices");
      const data = await response.json();
      cache = data;
      return res.status(200).json(data);
    } else {
      console.log("Using cache");
      return res.status(200).json(cache);
    }
  } catch (error) {
    if (Object.keys(cache).length) {
      return res.status(200).json(cache);
    } else {
      return res.status(500).json({ error: "Failed to fetch prices." });
    }
  }
}
