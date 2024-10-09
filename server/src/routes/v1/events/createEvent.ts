import { Request, Response } from "express";

import EventsService from "../../../database/services/events.service";
import { Slot } from "../../../types/Slot";
import { Event } from "../../../types/Event";

export default async function createEvent(req: Request, res: Response) {
  let body = req.body;

  if (
    !body.name ||
    !body.startDatetime ||
    !body.endDatetime ||
    !body.slots ||
    !Array.isArray(body.slots)
  ) {
    res.status(400).send({ error: "Invalid body" });
    return;
  }

  let idEvent = await EventsService.getNewId();

  let event: Event = {
    Id_Event: idEvent,
    name: body.name as string,
    startDateTime: body.startDatetime as Date,
    endDateTime: body.endDatetime as Date,
  };

  let slots: Slot[] = body.slots as {
    startDatetime: Date;
    endDatetime: Date;
    Id_Event: string;
  }[];

  slots = slots.map((slot) => {
    return {
      Id_Slot: idEvent,
      startDatetime: slot.startDatetime,
      endDatetime: slot.endDatetime,
      Id_Event: idEvent,
    };
  });

  try {
    await EventsService.insert(event, slots);
    res.send({ id: idEvent });
  } catch (error) {
    res.status(500).send({ error: "Error while creating event" });
  }
}
