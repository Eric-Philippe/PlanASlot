import { Request, Response } from "express";

import EventsService from "../../../database/services/events.service";

export default async function deleteEvent(req: Request, res: Response) {
  let id = req.params.id;

  try {
    EventsService.delete(id);
    res.send({ id: id });
  } catch (error) {
    res.status(500).send({ error: "Error while deleting event" });
  }
}
