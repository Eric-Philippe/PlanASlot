import { Request, Response } from "express";

import Services from "../../../database/Services";

export default async function getAllResolvedEvents(
  req: Request,
  res: Response
) {
  try {
    const events = await Services.getAllEventsResolved();

    res.send(events);
  } catch (error) {
    res.status(404).send({ error: "No event found with this id" });
  }
}
