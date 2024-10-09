import * as express from "express";
import { eventsRouter } from "./events/eventsRouter";
import { registrationsRouter } from "./registration/registrationsRouter";
import { loginRouter } from "./login/loginRouter";

export const v1Routes = express.Router();

v1Routes.use("/events", eventsRouter);
v1Routes.use("/registrations", registrationsRouter);
v1Routes.use("/login", loginRouter);

v1Routes.get("*", (req, res) => {
  res.status(404).send({ error: "No api v1 route found" });
});
