import express from "express";
import getResolvedEvent from "./getResolvedEvent";
import getAllResolvedEvents from "./getAllResolvedEvents";
import createEvent from "./createEvent";
import deleteEvent from "./deleteEvent";

export const eventsRouter = express.Router();

eventsRouter.post("/createEvent", createEvent);
eventsRouter.get("/getResolvedEvent/:id", getResolvedEvent);
eventsRouter.get("/getAllResolvedEvents", getAllResolvedEvents);
eventsRouter.delete("/deleteEvent/:id", deleteEvent);
