import { Injectable } from "@angular/core";
import { EventResolved } from "../types/Event";
import { API_URL } from "../env";

@Injectable()
export class EventService {
  // async getEvents(): Promise<EventResolved> {
  //     try {
  //     } catch (err) {}
  // }

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
}
