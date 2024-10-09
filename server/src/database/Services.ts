import { Event, EventResolved } from "../types/Event";
import { Registration } from "../types/Registration";
import { Slot, SlotResolved } from "../types/Slot";
import Database from "./db.connection";
import EventsService from "./services/events.service";
import RegistrationsService from "./services/registrations.service";
import SlotsService from "./services/slots.service";

export default class Services {
  public static getAllEventsResolved = async (): Promise<EventResolved[]> => {
    const req = `
        SELECT
            e.Id_Event,
            e.name,
            e.startDatetime,
            e.endDatetime,
            r.Id_Registration,
            r.email,
            r.firstname,
            r.lastname,
            r.registerDatetime,
            s.Id_Booking,
            s.startDatetime as slotStartDatetime,
            s.endDatetime as slotEndDatetime
        FROM Events e
        JOIN Slots s ON e.Id_Event = s.Id_Event
        LEFT JOIN Registrations r ON s.Id_Registration = r.Id_Registration;
    `;

    const result = await Database.query(req);

    const events: EventResolved[] = [];

    for (const row of result.rows) {
      const event = events.find((e) => e.Id_Event === row.id_event);

      if (event) {
        const slot: SlotResolved = {
          Id_Booking: row.id_booking as string,
          startDatetime: row.slotstartdatetime as Date,
          endDatetime: row.slotenddatetime as Date,
          Id_Event: row.id_event as string,
          Id_Registration: row.id_registration as string,
          registration: {
            Id_Registration: row.id_registration,
            email: row.email,
            firstname: row.firstname,
            lastname: row.lastname,
            registerDatetime: row.registerdatetime,
          },
        };

        event.slots.push(slot);
      } else {
        const registration: Registration = {
          Id_Registration: row.id_registration,
          email: row.email,
          firstname: row.firstname,
          lastname: row.lastname,
          registerDatetime: row.registerdatetime,
        };

        const slot: SlotResolved = {
          Id_Booking: row.id_booking as string,
          startDatetime: row.slotstartdatetime as Date,
          endDatetime: row.slotenddatetime as Date,
          Id_Event: row.id_event as string,
          Id_Registration: row.id_registration as string,
          registration: registration,
        };

        events.push({
          Id_Event: row.id_event as string,
          name: row.name as string,
          startDateTime: row.startdatetime as Date,
          endDateTime: row.enddatetime as Date,
          slots: [slot],
        });
      }
    }

    return events;
  };

  public static getEventResolvedFromId = async (
    id: string
  ): Promise<EventResolved> => {
    const req = `
        SELECT
            e.Id_Event,
            e.name,
            e.startDatetime,
            e.endDatetime,
            r.Id_Registration,
            r.email,
            r.firstname,
            r.lastname,
            r.registerDatetime,
            s.Id_Booking,
            s.startDatetime as slotStartDatetime,
            s.endDatetime as slotEndDatetime
        FROM Events e
        JOIN Slots s ON e.Id_Event = s.Id_Event
        LEFT JOIN Registrations r ON s.Id_Registration = r.Id_Registration
        WHERE e.Id_Event = $1;
    `;

    const values = [id];

    const result = await Database.query(req, values);

    if (result.rowCount === 0) {
      throw new Error("No event found with this id");
    }

    const registrations: Registration[] = result.rows.map((row) => ({
      Id_Registration: row.id_registration,
      email: row.email,
      firstname: row.firstname,
      lastname: row.lastname,
      registerDatetime: row.registerdatetime,
    }));

    const resolvedSlots: SlotResolved[] = result.rows.map((row) => ({
      Id_Booking: row.id_booking as string,
      startDatetime: row.slotstartdatetime as Date,
      endDatetime: row.slotenddatetime as Date,
      Id_Event: row.id_event as string,
      Id_Registration: row.id_registration as string,
      registration:
        registrations.find((r) => r.Id_Registration === row.id_registration) ||
        null,
    }));

    const event: EventResolved = {
      Id_Event: id,
      name: result.rows[0].name as string,
      startDateTime: result.rows[0].startDatetime as Date,
      endDateTime: result.rows[0].endDatetime as Date,
      slots: resolvedSlots,
    };

    return event;
  };

  public static insertEventRes = async (
    event: EventResolved
  ): Promise<void> => {
    const query = `INSERT INTO events (Id_Event, startDatetime, endDatetime) VALUES ($1, $2, $3) RETURNING *`;
    const values = [event.Id_Event, event.startDateTime, event.endDateTime];
    await Database.query(query, values);

    for (const slot of event.slots) {
      await SlotsService.insert(slot);
    }
  };

  public static insertEvent = async (
    event: Event,
    slots: Slot[]
  ): Promise<void> => {
    EventsService.insert(event, slots);
  };

  public static attachRegistrationToSlot = async (
    registration: Registration,
    slotId: string
  ): Promise<void> => {
    await SlotsService.attachRegistration(slotId, registration);
  };

  public static detachRegistrationFromSlot = async (
    slotId: string,
    registrationId: string
  ): Promise<void> => {
    await SlotsService.detachRegistration(slotId, registrationId);
  };
}
