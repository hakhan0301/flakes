import { CronJob } from 'cron';
import fetch from 'node-fetch';

import { prisma } from '@flakes/db/';
import type { CronJob as CronJobType } from '@flakes/db/types';

interface CronJobDict {
  [key: string]: CronJob;
}
const runningCronJobs: CronJobDict = {};

export const scheduleCronJob = (cronJob: CronJobType) => {
  console.log('scheduling: ', cronJob.title);

  const job = new CronJob(cronJob.cron, async () => {
    console.log('running: ', cronJob.title);

    fetch(cronJob.url)
      .then(res => res.text())
      .then(res => console.log(`result from ${cronJob.title}: `, res));
  }, null, true);

  job.start();

  runningCronJobs[cronJob.title] = job;
}

export const removeCronJob = async (title: string) => {
  console.log('removing: ', title);

  const job = runningCronJobs[title];
  job.stop();
  delete runningCronJobs[title];
}

export const startupCronServer = async () => {
  const cronJobs = await prisma.cronJob.findMany();

  cronJobs.forEach(scheduleCronJob);
}
