import Database from "../db.connection";

import { Event } from "../../types/Event";
import { Slot } from "../../types/Slot";
import SlotsService from "./slots.service";

const ID_LENGTH = 28;

export default class EventsService {
  public static insert = async (event: Event, slots: Slot[]): Promise<void> => {
    const query = `INSERT INTO events (id_event, name, startDateTime, endDateTime) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [
      event.Id_Event,
      event.name,
      event.startDateTime,
      event.endDateTime,
    ];
    await Database.query(query, values);

    for (const slot of slots) {
      await SlotsService.insert(slot);
    }

    return;
  };

  public static get = async (): Promise<Event[]> => {
    const query = `SELECT * FROM events`;
    const result = await Database.query(query);
    return result?.rows as Event[];
  };

  public static getAllIds = async (): Promise<string[]> => {
    const query = `SELECT id_event FROM events`;
    const result = await Database.query(query);
    return result?.rows.map((row) => row.id_event) as string[];
  };

  public static getNewId = async (): Promise<string> => {
    let allIds = await EventsService.getAllIds();
    return EventsService.generateUniqueEventKey(allIds, ID_LENGTH);
  };

  public static getById = async (id: string): Promise<Event> => {
    const query = `SELECT * FROM events WHERE id_event = $1`;
    const values = [id];
    const result = await Database.query(query, values);
    return result?.rows[0] as Event;
  };

  /**
   * Delete an event by its id, removing first all its registrations then slots
   * @param id - The id of the event to delete
   */
  public static delete = async (id: string): Promise<void> => {
    const querySlots = `
      DELETE FROM Slots
      WHERE Id_Event = $1
      RETURNING Id_Registration
    `;

    const queryRegistrations = `
      DELETE FROM Registrations
      WHERE Id_Registration = $1
    `;

    const queryEvent = `
      DELETE FROM Events
      WHERE Id_Event = $1
    `;

    let idRegistrations = await Database.query(querySlots, [id]);

    if (idRegistrations.rowCount === 0) return;

    await Database.query(queryRegistrations, [idRegistrations]);
    await Database.query(queryEvent, [id]);

    return;
  };

  private static generateUniqueEventKey = (
    existingKeys: string[],
    length: number
  ) => {
    let newKey = "";
    do {
      newKey = Math.random()
        .toString(36)
        .substring(2, 2 + length);
    } while (existingKeys.includes(newKey));

    console.log(`Generated key: ${newKey}`);

    return newKey;
  };
}
