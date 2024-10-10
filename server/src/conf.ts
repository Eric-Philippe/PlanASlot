import dotenv from "dotenv";

dotenv.config();

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

let APP_PORT = parseInt(process.env.PORT as string) || 3000;

const HASHED_PASSWORD = process.env.HASHED_PASSWORD || "admin";

if (
  DB_USER === undefined ||
  DB_PASSWORD === undefined ||
  DB_NAME === undefined ||
  isNaN(APP_PORT) ||
  HASHED_PASSWORD === undefined
) {
  console.error("Missing environment variables");
  process.exit(1);
}

export { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, APP_PORT, HASHED_PASSWORD };
