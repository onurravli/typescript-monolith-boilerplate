import { config } from "dotenv";
import path from "path";
import { logger } from "@/utils";

const NODE_ENV = process.env.NODE_ENV || "development";
const DOTENV_PATH = path.resolve(process.cwd(), `.env.${NODE_ENV}`);

config({
  path: DOTENV_PATH,
});

const env = {
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV,
};

Object.entries(env).forEach(([key, value]) => {
  if (!value) {
    logger.warn(`${key} is not defined.`);
  }
});

export default env;
