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
  'bg-yellow-200/[1.0] text-orange-700',
  'bg-yellow-200/[.95] text-orange-700',
  'bg-yellow-200/[.90] text-orange-700',
  'bg-yellow-200/[.85] text-orange-700',
  'bg-yellow-200/[.80] text-orange-700',
  'bg-yellow-200/[.75] text-orange-700',
  'bg-yellow-200/[.70] text-orange-800',
  'bg-yellow-200/[.65] text-orange-800',
  'bg-yellow-200/[.60] text-orange-800',
  'bg-yellow-200/[.55] text-orange-800',
  'bg-yellow-200/[.50] text-orange-800',
  'bg-yellow-200/[.45] text-orange-800',
  'bg-yellow-200/[.40] text-orange-800',
  'bg-yellow-200/[.35] text-orange-900',
  'bg-yellow-200/[.30] text-orange-900',
  'bg-yellow-200/[.25] text-orange-900',
  'bg-yellow-200/[.20] text-orange-900',
  'bg-yellow-200/[.15] text-orange-900',
  'bg-yellow-200/[.10] text-orange-900',
  'bg-yellow-200/[.5]  text-orange-900',
]

function CronJob({ title, cron, url, index, onDelete }: CronJobProps) {
  const bgOpacity = Math.floor((index) * bgColors.length);

  return (
    <tr className={`table-row ${bgColors[bgOpacity]}`}>
      <td>
        <button onClick={() => onDelete(title)} className='table-cell py-1 pl-3 hover:text-purple-600'>
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
    <tr className=''>
      <td className='w-full h-full group cursor-pointer'>
        <FaPlus className='group-hover:text-purple-600 mx-auto' />
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
  const [jobs, setJobs] = useState<CronJob[]>(_jobs.flatMap(job => [job, job, job, job, job, job]));

  const removeJob = async (title: string) => {
    await fetch('/api/jobs/delete', {
      method: 'POST',
      body: JSON.stringify({ title }),
    });
    setJobs(jobs.filter(job => job.title !== title));
  }


  return (
    <div className='min-h-screen bg-gradient-to-b from-yellow-300 to-red-400 text-orange-900'>
      {/* navbar */}
      <nav className='bg-red-500 shadow-lg'>
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
        <table className='table-fixed w-full'>
          <thead className='bg-red-500 font-bold'>
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
