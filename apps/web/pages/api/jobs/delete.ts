import type { NextApiRequest, NextApiResponse } from 'next'
// @ts-ignore
import cronJoi from 'joi-cron-expression';
import _Joi from 'joi';
import { endointWrapper, validator } from "@cereal/api-helpers";
import { prisma } from '@cereal/db';

const Joi = cronJoi(_Joi);

const bodySchema = Joi.object({
  title: Joi.string().min(5).required()
});

export default endointWrapper()
  .use(
    validator({ body: bodySchema })
  )
  .post(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.parse(req.body);
  await prisma.cronJob.delete({
    where: { title: body.title }
  })
  res.json('Success');
}
