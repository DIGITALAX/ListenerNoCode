import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.post(
      "https://litlistener.onrender.com/interrupt",
      req.body,
      {
        headers: {
          "x-api-key": process.env.SERVER_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    return res.status(200).json(data);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}
