import type { NextApiRequest, NextApiResponse } from "next";
import type { NextHandler } from "next-connect";

import nc from "next-connect";
import Joi from 'joi';
export const endointWrapper = () => nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.statusCode = 500;
    res.end("Internal server Error.");
  },
  onNoMatch: (req, res) => {
    res.statusCode = 404;
    res.end(`Method: ${req.method} not found.`);
  },
});


interface ValidatorInput {
  body: Joi.ObjectSchema
}
export const validator = (schema: ValidatorInput) =>
  (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    const { error: bodyError } = schema.body.validate(JSON.parse(req.body));
    if (bodyError) {
      res.statusCode = 400;
      res.end(bodyError.message);
    }
    next();
  }