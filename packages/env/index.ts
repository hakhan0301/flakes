import dotEnv from 'dotenv';
import path from 'path';

dotEnv.config({
  path: path.join(__dirname, './.env'),
});

interface EnvVars {
  API_PORT: string;
}

const envVars: EnvVars = {
  API_PORT: process.env.API_PORT as string,
};

export default envVars;