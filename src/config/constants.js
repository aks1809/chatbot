import * as dotenv from 'dotenv';

dotenv.config();

const configObj = {
  PORT: process.env.PORT,
  BASE_PATH: process.cwd(),

  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
  DB_DOMAIN: process.env.DB_DOMAIN,

  OPENAI_KEY: process.env.OPENAI_KEY,
  OPENAI_ENDPOINT: process.env.OPENAI_ENDPOINT
};

export default {
  ...configObj,
};
