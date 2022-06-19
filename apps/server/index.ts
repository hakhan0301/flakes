import express from 'express';
import cors from 'cors';
import ENV from '@cereal/env';
import { prisma } from '@cereal/db';

const app = express();

app.use(express.json());
app.use(cors());

app.get("/jobs", async (req, res) => {
  const cronJobs = await prisma.cronJob.findMany();
  res.json(cronJobs);
});

app.post('/jobs', async (req, res) => {
  const cronJob = req.body;

  await prisma.cronJob.create({
    data: cronJob
  });

  res.send("okay");
});



app.listen(ENV.API_PORT, () => {
  console.log(`Server is listening on port ${ENV.API_PORT}`);
});
