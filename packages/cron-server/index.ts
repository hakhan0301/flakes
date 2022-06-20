import cron from 'node-cron';

import { prisma } from '@flakes/db/';
import type { CronJob } from '@flakes/db/types';

interface CronJobDict {
  [key: string]: cron.ScheduledTask;
}
const runningCronJobs: CronJobDict = {};

export const scheduleCronJob = (cronJob: CronJob) => {
  const task = cron.schedule(cronJob.cron, async () => {
    const res = await fetch(cronJob.url);

    const json = await res.json();
    console.log(`${cronJob.title} cron job executed`);
    console.log(json);
  });

  runningCronJobs[cronJob.title] = task;
}

export const removeCronJob = async (title: string) => {
  const task = runningCronJobs[title];
  task.stop();
  delete runningCronJobs[title];
}

const setupServer = async () => {
  const cronJobs = await prisma.cronJob.findMany();

  cronJobs.forEach(scheduleCronJob);
}

setupServer();
