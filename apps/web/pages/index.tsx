import type { NextPage, GetServerSideProps } from 'next'
import type { CronJob } from '@cereal/db/types'
import { prisma } from '@cereal/db'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const jobs = await prisma.cronJob.findMany();

  return {
    props: {
      jobs
    }
  }
}

function CronJob({ title, cron, url }: CronJob) {
  return (
    <div>
      <p>{title}</p>
      <p>{url}</p>
      <p>{cron}</p>
    </div>
  );
}

interface Props {
  jobs: CronJob[]
};
const Home: NextPage<Props> = ({ jobs }) => {
  return (
    <pre>
      {jobs.map(job => <CronJob key={job.title} {...job} />)}
    </pre>
  )
}
export default Home;
