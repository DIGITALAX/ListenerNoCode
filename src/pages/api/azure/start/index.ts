import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.post(
      "https://172.173.175.82/start",
      req.body,
      {
        headers: {
          "x-api-key": process.env.SERVER_API_KEY,
        },
      }
    );
    const data = response.data;
    res.status(200).json(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}
