import type { NextApiRequest, NextApiResponse } from 'next'
import Joi from 'joi';
import { endointWrapper, validator } from "@cereal/api-helpers";

const bodySchema = Joi.object({
  a: Joi.string().required(),
});

export default endointWrapper()
  .use(validator({
    body: bodySchema
  }))
  .put(handler);

type GetResponse = {
  name: string
}
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetResponse>
) {
  res.json({ name: "John Doe" });
}
