interface Cron {
  title: string;
  cronTime: string;
  URL: string;
}

const cronJobs: Cron[] = [
  { title: 'Daily', cronTime: '0 0 0 * * *', URL: 'http://localhost:3000/daily' },
  { title: 'Weekly', cronTime: '0 0 0 * * 0', URL: 'http://localhost:3000/weekly' },
  { title: 'Monthly', cronTime: '0 0 0 1 * *', URL: 'http://localhost:3000/monthly' },
];

function CronJob(props: Cron) {
  return (
    <div className="max-w-lg w-full flex flex-col flex-grow">
      <div className="w-full p-2 bg-white">
        <h3 className="text-3xl">{props.title}</h3>
        <p className="px-4">{props.cronTime}</p>
        <p className="px-4">{props.URL}</p>
      </div>
    </div>
  );
}


function App() {
  return (
    <div className="bg-orange-500 h-screen w-screen">
      <div className="flex flex-col">
        {/* navbar */}
        <div className="bg-sky-400 p-4 text-emerald-800">
          <h1 className="text-3xl font-bold">
            Cereal - CRON Server
          </h1>
        </div>

        <div className="w-full flex flex-col items-center gap-4 p-4">
          {/* cron jobs */}
          {cronJobs.map((job) => <CronJob {...job} />)}
        </div>

      </div>

    </div>
  );
}

export default App;
