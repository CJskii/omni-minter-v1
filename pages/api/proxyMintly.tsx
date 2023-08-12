import { NextApiRequest, NextApiResponse } from "next";

const proxyMintly = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const mintId = req.query.id;
    const response = await fetch(
      `https://api.cjski.xyz/api/mintly?id=${mintId}`
    );

    if (!response.ok) {
      throw new Error(`API responded with HTTP ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error in proxyMintly:", error);
    res
      .status(500)
      .json({ error: `Failed to fetch data: ${(error as any).message}` });
  }
};

export default proxyMintly;
