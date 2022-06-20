import type { NextApiRequest, NextApiResponse } from 'next'
import nc from "next-connect";
import { endointWrapper } from "@cereal/api-helpers"

export default endointWrapper().get(handler);

type GetResponse = {
  name: string
}
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetResponse>
) {
  res.json({ name: "John Doe" });
}
