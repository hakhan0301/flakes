import type { NextPage, GetServerSideProps } from 'next'
import type { CronJob } from '@flakes/db/types'
import { prisma } from '@flakes/db'

import { FaCheck } from 'react-icons/fa';
import { IoMdTrash } from 'react-icons/io'
import { useEffect, useState } from 'react'

// @ts-ignore
import cronJoi from 'joi-cron-expression';
import _Joi from 'joi';

const Joi = cronJoi(_Joi);

const bodySchema = Joi.object({
  title: Joi.string().min(5).required(),
  cron: Joi.string().cron().required(),
  url: Joi.string().uri().required(),
});

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
      <td><p className='table-cell py-1 pr-2'>{title}</p></td>
      <td><p className='table-cell py-1 px-2'>{cron}</p></td>
      <td><p className='table-cell py-1 px-2'>{url}</p></td>
    </tr>
  );
}

interface CronFormProps {
  onSubmit: (title: string, cron: string, url: string) => Promise<void>
}

function CronForm({ onSubmit }: CronFormProps) {
  const [title, setTitle] = useState('');
  const [cron, setCron] = useState('');
  const [url, setUrl] = useState('');

  const submitForm = async () => {
    const { error } = bodySchema.validate({ title, cron, url });
    if (error) {
      return;
    }


    await onSubmit(title, cron, url);
    setTitle('');
    setCron('');
    setUrl('');
  }

  return (
    <tr className=''>
      <td onClick={submitForm}
        className='w-full h-full group cursor-pointer py-3'>
        <FaCheck className='group-hover:text-purple-600 mx-auto' />
      </td>
      <td className=''>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
          className='bg-yellow-100 rounded-md px-1 ' />
      </td>
      <td className='px-2'>
        <input type="text" value={cron} onChange={(e) => setCron(e.target.value)}
          className='bg-yellow-100 rounded-md px-1 ' />
      </td>
      <td className='px-2'>
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)}
          className='bg-yellow-100 rounded-md px-1 ' />
      </td>
    </tr >
  )
}

interface Props {
  jobs: CronJob[]
};
const Home: NextPage<Props> = () => {
  const [jobs, setJobs] = useState<CronJob[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://localhost:8000/api/jobs');
      const json = await res.json();
      setJobs(json);
    }
    fetchData();
  }, [setJobs]);

  const removeJob = async (title: string) => {
    await fetch('http://localhost:8000/api/jobs/delete', {
      method: 'POST',
      body: JSON.stringify({ title }),
    });
    setJobs(jobs.filter(job => job.title !== title));
  }

  const addJob = async (title: string, cron: string, url: string) => {
    const res = await fetch('http://localhost:8000/api/jobs/create', {
      method: 'POST',
      body: JSON.stringify({ title, cron, url }),
    });

    if (res.ok)
      setJobs(jobs.concat({ title, cron, url }));
  }


  return (
    <div className='min-h-screen bg-gradient-to-b from-yellow-300 to-red-400 text-orange-900'>
      {/* navbar */}
      <nav className='bg-red-500 shadow-lg'>
        <div className='flex md:flex-row items-center p-6'>
          <div className='flex flex-row gap-4 items-center'>
            <p className='text-3xl font-bold font-mono'>
              Flakes
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
            < CronForm onSubmit={addJob} />
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default Home;
