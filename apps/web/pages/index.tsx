import type { NextPage, GetServerSideProps } from 'next'
import type { CronJob } from '@cereal/db/types'
import { prisma } from '@cereal/db'

import { FaPlus } from 'react-icons/fa';
import { IoMdTrash } from 'react-icons/io'
import { useState } from 'react'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const jobs = await prisma.cronJob.findMany();
  return { props: { jobs } };
}


interface CronJobProps extends CronJob {
  index: number
  onDelete: (title: string) => void
}

const bgColors = [
  'bg-rose-400/[1.0]',
  'bg-rose-400/[.95]',
  'bg-rose-400/[.90]',
  'bg-rose-400/[.85]',
  'bg-rose-400/[.80]',
  'bg-rose-400/[.75]',
  'bg-rose-400/[.70]',
  'bg-rose-400/[.65]',
  'bg-rose-400/[.60]',
  'bg-rose-400/[.55]',
  'bg-rose-400/[.50]',
  'bg-rose-400/[.45]',
  'bg-rose-400/[.40]',
  'bg-rose-400/[.35]',
  'bg-rose-400/[.30]',
  'bg-rose-400/[.25]',
  'bg-rose-400/[.20]',
  'bg-rose-400/[.15]',
  'bg-rose-400/[.10]',
  'bg-rose-400/[.5]',
]

function CronJob({ title, cron, url, index, onDelete }: CronJobProps) {
  const bgOpacity = Math.floor(index * bgColors.length);

  return (
    <tr className={`table-row ${bgColors[bgOpacity]}`}>
      <td>
        <button onClick={() => onDelete(title)} className='table-cell py-1 pl-3 hover:text-teal-300'>
          <IoMdTrash />
        </button>
      </td>
      <td><p className='table-cell py-1 pr-2'>{bgOpacity}{title}</p></td>
      <td><p className='table-cell py-1 px-2'>{cron}</p></td>
      <td><p className='table-cell py-1 px-2'>{url}</p></td>
    </tr>
  );
}

function CronForm() {
  return (
    <tr>
      <td className='w-full h-full group cursor-pointer'>
        <FaPlus className='group-hover:text-teal-300 mx-auto' />
      </td>
      <td><p className='py-1 pr-2'>title</p></td>
      <td><p className='py-1 px-2'>cron</p></td>
      <td><p className='py-1 px-2'>url</p></td>
    </tr >
  )
}

interface Props {
  jobs: CronJob[]
};
const Home: NextPage<Props> = ({ jobs: _jobs }) => {
  const [jobs, setJobs] = useState<CronJob[]>(_jobs);

  const removeJob = async (title: string) => {
    await fetch('/api/jobs/delete', {
      method: 'POST',
      body: JSON.stringify({ title }),
    });
    setJobs(jobs.filter(job => job.title !== title));
  }


  return (
    <div className='min-h-screen bg-rose-500 text-gray-900'>
      {/* navbar */}
      <nav className='bg-sky-400 shadow-lg'>
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

      {/* cron table */}
      <div className='flex flex-col gap-3 p-12'>
        <table className='table-fixed w-full shadow-md'>
          <thead className='bg-sky-300 font-bold text-gray-700'>
            <tr>
              <th className="text-left w-10"></th>
              <th className="text-left pr-3 py-2">Title</th>
              <th className="text-left px-2 py-2">CRON</th>
              <th className="text-left px-2 py-2">Endpoint</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, i) =>
              <CronJob key={job.title} index={i / jobs.length}
                onDelete={removeJob} {...job} />)}
            < CronForm />
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default Home;
