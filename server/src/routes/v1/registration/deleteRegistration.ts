import { Request, Response } from "express";

import Services from "../../../database/Services";
import SlotsService from "../../../database/services/slots.service";

export default async function deleteRegistration(req: Request, res: Response) {
  let id = req.params.id;

  try {
    let slot = (await SlotsService.getById(id)) as any;

    await Services.detachRegistrationFromSlot(
      id,
      slot["id_registration"] as string
    );
    res.send({ id: id });
  } catch (error) {
    res.status(500).send({ error: "Error while creating registration" });
  }
}
