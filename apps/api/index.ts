import express from 'express';
import cors from 'cors';
import path from 'path';

import { prisma } from '@flakes/db';
import { removeCronJob, scheduleCronJob, startupCronServer } from '@flakes/cron-server';

import cronJoi from 'joi-cron-expression';
import _Joi from 'joi';
const Joi = cronJoi(_Joi);

const app = express();
app.use(express.json({ type: '*/*', }));
app.use(cors());

app.use('/', express.static(path.join(__dirname, './public'), {
  index: "index.html"
}));

app.get('/api/jobs', async (req, res) => {
  const jobs = await prisma.cronJob.findMany();
  res.json(jobs);
});

const createSchema = Joi.object({
  title: Joi.string().min(5).required(),
  cron: Joi.string().cron().required(),
  url: Joi.string().uri().required(),
});
app.post('/api/jobs/create', async (req, res) => {
  const { title, cron, url } = req.body;

  const { error } = createSchema.validate({ title, cron, url });
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  await prisma.cronJob.create({
    data: {
      title, cron, url
    }
  });

  scheduleCronJob({ title, cron, url });
  res.json('Success');
});


const deleteSchema = Joi.object({
  title: Joi.string().min(5).required()
});
app.post('/api/jobs/delete', async (req, res) => {
  const { title } = req.body;

  const { error } = deleteSchema.validate({ title });
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  await prisma.cronJob.delete({
    where: { title: title }
  });
  removeCronJob(title);
  res.json('Success');
});


startupCronServer();
app.listen(8000, () => {
  console.log('Listening on port 8000');
});