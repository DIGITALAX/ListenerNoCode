import axios from "axios";
import https from "https";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
    const response = await axios.post(
      "http://localhost:3000/instantiate",
      req.body,
      {
        headers: {
          "x-api-key": process.env.SERVER_API_KEY,
          "Content-Type": "application/json",
        },
        httpsAgent: agent,
      }
    );
    const data = response.data;
    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
