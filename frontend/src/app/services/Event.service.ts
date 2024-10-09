import { Injectable } from "@angular/core";
import { EventResolved } from "../types/Event";
import { API_URL } from "../env";

@Injectable()
export class EventService {
  async getEvents(): Promise<EventResolved[]> {
    try {
      let response = await fetch(`${API_URL}/events/getAllResolvedEvents`);

      if (response.status !== 200) {
        throw new Error("Error while fetching events");
      }

      return await response.json();
    } catch (err) {
      throw new Error("Error while fetching events");
    }
  }

  async getEvent(id: string): Promise<EventResolved> {
    try {
      let response = await fetch(`${API_URL}/events/getResolvedEvent/${id}`);

      if (response.status !== 200) {
        throw new Error("Error while fetching event");
      }

      return await response.json();
    } catch (err) {
      throw new Error("Error while fetching event");
    }
  }

  async createEvent(
    name: string,
    startDatetime: Date,
    endDatetime: Date,
    slots: { startDatetime?: Date; endDatetime?: Date }[]
  ): Promise<void> {
    try {
      let response = await fetch(`${API_URL}/events/createEvent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          startDatetime,
          endDatetime,
          slots,
        }),
      });

      if (response.status !== 200) {
        throw new Error("Error while creating event");
      }
    } catch (err) {
      throw new Error("Error while creating event");
    }
  }

  async createRegistration(
    firstname: string,
    lastname: string,
    email: string,
    slotId: string
  ): Promise<void> {
    try {
      let response = await fetch(
        `${API_URL}/registrations/createRegistration`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname,
            lastname,
            email,
            slotId,
          }),
        }
      );

      if (response.status !== 200) {
        throw new Error("Error while creating registration");
      }
    } catch (err) {
      throw new Error("Error while creating registration");
    }
  }

  async deleteRegistration(slotId: string): Promise<void> {
    try {
      let response = await fetch(
        `${API_URL}/registrations/deleteRegistration/${slotId}`,
        {
          method: "DELETE",
        }
      );

      if (response.status !== 200) {
        throw new Error("Error while deleting registration");
      }
    } catch (err) {
      throw new Error("Error while deleting registration");
    }
  }

  async deleteEvent(id: string): Promise<void> {
    try {
      let response = await fetch(`${API_URL}/events/deleteEvent/${id}`, {
        method: "DELETE",
      });

      if (response.status !== 200) {
        throw new Error("Error while deleting event");
      }
    } catch (err) {
      throw new Error("Error while deleting event");
    }
  }
}
