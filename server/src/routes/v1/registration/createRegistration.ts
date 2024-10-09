import { Request, Response } from "express";

import { Registration } from "../../../types/Registration";
import Services from "../../../database/Services";

export default async function createRegistration(req: Request, res: Response) {
  let body = req.body;

  if (!body.firstname || !body.lastname || !body.email || !body.slotId) {
    res.status(400).send({ error: "Invalid body" });
    return;
  }

  let registration: Registration = {
    firstname: body.firstname as string,
    lastname: body.lastname as string,
    email: body.email as string,
    registerDatetime: new Date(),
  };

  try {
    let registrationId = await Services.attachRegistrationToSlot(
      registration,
      body.slotId
    );
    res.send({ id: registrationId });
  } catch (error) {
    res.status(500).send({ error: "Error while creating registration" });
  }
}
