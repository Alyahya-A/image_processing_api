import dotenv from 'dotenv';
import path from 'path';

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, '../config/config.env') });

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

interface Config {
  PORT: number | undefined;
}

// Loading process.env as ENV interface

const getConfig = (): Config => {
  return {
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
  };
};

const config = getConfig();

export default config;
