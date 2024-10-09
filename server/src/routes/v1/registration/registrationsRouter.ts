import express from "express";
import createRegistration from "./createRegistration";
import deleteRegistration from "./deleteRegistration";

export const registrationsRouter = express.Router();

registrationsRouter.post("/createRegistration", createRegistration);

registrationsRouter.delete("/deleteRegistration/:id", deleteRegistration);
