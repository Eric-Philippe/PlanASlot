import express from "express";
import getResolvedEvent from "./getResolvedEvent";
import createEvent from "./createEvent";

export const eventsRouter = express.Router();

eventsRouter.post("/createEvent", createEvent);
eventsRouter.get("/getResolvedEvent/:id", getResolvedEvent);
