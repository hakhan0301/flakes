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

interface Props {
  jobs: CronJob[]
};
const Home: NextPage<Props> = ({ jobs }) => {
  return (
    <pre>
      {JSON.stringify(jobs)}
    </pre>
  )
}
export default Home;
