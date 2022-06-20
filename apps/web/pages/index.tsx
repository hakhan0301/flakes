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

function CronJob({ title, cron, url, index }: CronJob & { index: number }) {
  return (
    <div className={`table-row ${index % 2 == 0 ? 'bg-rose-300' : 'bg-rose-400'}`}>
      <p className='table-cell py-1 px-2'>{title}</p>
      <p className='table-cell py-1 px-2'>{cron}</p>
      <p className='table-cell py-1 px-2'>{url}</p>
    </div>
  );
}

interface Props {
  jobs: CronJob[]
};
const Home: NextPage<Props> = ({ jobs }) => {
  return (
    <div className='min-h-screen bg-rose-500 text-gray-900'>
      {/* navbar */}
      <nav className='bg-sky-300 shadow-lg'>
        <div className='flex md:flex-row items-center p-6'>
          <div className='flex flex-row gap-4 items-center'>
            <p className='text-3xl font-bold font-mono'>
              Cereal
            </p>
            <span className='text-xl font-bold font-mono'>
              -
            </span>

            <span className='text-xl font-bold font-mono'>
              Cron Job Server
            </span>
          </div>
        </div>
      </nav>


      <div className='flex flex-col gap-3 p-6'>
        <div className='table w-full'>
          <div className='table-header-group bg-pink-200 font-bold text-gray-700'>
            <div className="table-cell text-left px-3 py-2">Title</div>
            <div className="table-cell text-left px-3 py-2">CRON</div>
            <div className="table-cell text-left px-3 py-2">URL</div>

          </div>
          <div className="table-row-group">
            {jobs.map((job, i) => <CronJob key={job.title} index={i} {...job} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home;
