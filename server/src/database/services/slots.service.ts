import Database from "../db.connection";
import { Slot } from "../../types/Slot";
import RegistrationsService from "./registrations.service";
import { Registration } from "../../types/Registration";

export default class SlotsService {
  public static insert = async (slot: Slot): Promise<void> => {
    const query = `INSERT INTO slots (startDatetime, endDatetime, Id_Event, Id_Registration) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [
      slot.startDatetime,
      slot.endDatetime,
      slot.Id_Event,
      slot.Id_Registration,
    ];
    await Database.query(query, values);
  };

  public static get = async (): Promise<Slot[]> => {
    const query = `SELECT * FROM slots`;
    const result = await Database.query(query);
    return result?.rows as Slot[];
  };

  public static getById = async (id: string): Promise<Slot> => {
    const query = `SELECT * FROM slots WHERE id_booking = $1`;
    const values = [id];
    const result = await Database.query(query, values);
    return result?.rows[0] as Slot;
  };

  public static getByEventId = async (id: string): Promise<Slot[]> => {
    const query = `SELECT * FROM slots WHERE id_event = $1`;
    const values = [id];
    const result = await Database.query(query, values);
    return result?.rows as Slot[];
  };

  public static delete = async (id: string): Promise<void> => {
    const query = `DELETE FROM slots WHERE id_booking = $1`;
    const values = [id];
    await Database.query(query, values);
  };

  public static attachRegistration = async (
    idSlot: string,
    registration: Registration
  ) => {
    let regId = await RegistrationsService.insert(registration);

    const query = `UPDATE slots SET id_registration = $1 WHERE id_booking = $2`;
    const values = [regId, idSlot];

    await Database.query(query, values);
  };

  public static detachRegistration = async (idSlot: string) => {
    const query = `UPDATE slots SET id_registration = NULL WHERE id_booking = $1`;
    const values = [idSlot];

    await Database.query(query, values);
    await RegistrationsService.delete(idSlot);
  };
}
