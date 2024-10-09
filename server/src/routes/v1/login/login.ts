import { Request, Response } from "express";

import bcrypt from "bcrypt";
import { HASHED_PASSWORD } from "../../../conf";

export default async function login(req: Request, res: Response) {
  let body = req.body;

  if (!body.password) {
    res.status(400).send({ error: "Invalid body" });
    return;
  }

  let password = body.password as string;

  try {
    let isPasswordCorrect = await bcrypt.compare(password, HASHED_PASSWORD);
    if (isPasswordCorrect) {
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    res.status(500).send({ error: "Error while checking password" });
  }
}
