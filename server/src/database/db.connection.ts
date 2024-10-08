import { Pool } from "pg";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "../conf";

export default class Database {
  private static database = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: DB_PORT,
  });

  public static query = async (query: string, values?: any[]) => {
    const client = await this.database.connect();
    try {
      return await client.query(query, values);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      client.release();
    }
  };
}
