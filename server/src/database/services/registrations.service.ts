import Database from "../db.connection";

import { Registration } from "../../types/Registration";

export default class RegistrationsService {
  public static insert = async (
    registration: Registration
  ): Promise<number> => {
    const query = `INSERT INTO registrations (email, firstname, lastName, registerDatetime) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [
      registration.email,
      registration.firstname,
      registration.lastname,
      registration.registerDatetime,
    ];
    const result = await Database.query(query, values);

    return result?.rows[0].id_registration;
  };

  public static get = async (): Promise<Registration[]> => {
    const query = `SELECT * FROM registrations`;
    const result = await Database.query(query);
    return result?.rows as Registration[];
  };

  public static getById = async (id: string): Promise<Registration> => {
    const query = `SELECT * FROM registrations WHERE id_registration = $1`;
    const values = [id];
    const result = await Database.query(query, values);
    return result?.rows[0] as Registration;
  };

  public static getByRegistrationId = async (
    id: string
  ): Promise<Registration> => {
    const query = `SELECT * FROM registrations WHERE id_registration = $1`;
    const values = [id];
    const result = await Database.query(query, values);
    return result?.rows[0] as Registration;
  };

  public static delete = async (id: string): Promise<void> => {
    const query = `DELETE FROM registrations WHERE id_registration = $1`;
    const values = [id];
    await Database.query(query, values);
  };
}
