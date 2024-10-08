import { Request, Response } from "express";

import Services from "../../../database/Services";

export default async function getResolvedEvent(req: Request, res: Response) {
  const id = req.params.id;

  try {
    const event = await Services.getEventResolvedFromId(id);

    res.send(event);
  } catch (error) {
    res.status(404).send({ error: "No event found with this id" });
  }
}
