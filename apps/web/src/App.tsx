import React, { useEffect } from "react";
import { useState } from "react";

interface Cron {
  title: string;
  time: string;
  URL: string;
}

function CronJob(props: Cron) {
  return (
    <div className="max-w-lg w-full flex flex-col flex-grow">
      <div className="w-full p-2 bg-white">
        <h3 className="text-3xl">{props.title}</h3>
        <p className="px-4">{props.time}</p>
        <p className="px-4">{props.URL}</p>
      </div>
    </div>
  );
}

function App() {
  const [cronJobs, setCronJobs] = useState<Cron[]>([]);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    async function getCronJobs() {
      const res = await fetch("http://localhost:8000/jobs");
      const data = await res.json();

      setCronJobs(data);
    }
    getCronJobs();
  }, []);

  async function submitCronJob(event: React.FormEvent) {
    event.preventDefault();
    const cron: Cron = { title: title, time: time, URL: url };
    await fetch("http://localhost:8000/jobs", {
      method: "POST",
      body: JSON.stringify(cron),
      headers: { "Content-Type": "application/json" }
    })
    setCronJobs([...cronJobs, cron]);
  }

  return (
    <div className="bg-orange-500 h-screen w-screen">
      <div className="flex flex-col">
        {/* navbar */}
        <div className="bg-sky-400 p-4 text-emerald-800">
          <h1 className="text-3xl font-bold">Cereal - CRON Server</h1>
        </div>

        <form className="flex flex-col gap-1 items-center" onSubmit={submitCronJob}>
          <label>Job Title:</label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          ></input>
          <label>Job Time:</label>
          <input
            type="text"
            value={time}
            onChange={(event) => setTime(event.target.value)}
          ></input>
          <label>Job URL:</label>
          <input
            type="text"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          ></input>
          <button type="submit" className="bg-white">
            Submit
          </button>
        </form>

        <div className="w-full flex flex-col items-center gap-4 p-4">
          {/* cron jobs */}
          {cronJobs.map((job) => (
            <CronJob {...job} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
