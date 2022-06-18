import dotEnv from 'dotenv';
import path from 'path';

dotEnv.config({
  path: path.join(__dirname, './.env'),
});

interface EnvVars {
  API_PORT: number;
}

const envVars: EnvVars = {
  API_PORT: parseInt(process.env.API_PORT as string, 10),
};

export default envVars;