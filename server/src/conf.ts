import dotenv from "dotenv";

dotenv.config();

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = parseInt(process.env.DB_PORT as string) || 5432;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

let APP_PORT = parseInt(process.env.PORT as string) || 3000;

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const HASHED_PASSWORD = process.env.HASHED_PASSWORD || "admin";

export {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  APP_PORT,
  ADMIN_USERNAME,
  HASHED_PASSWORD,
};
