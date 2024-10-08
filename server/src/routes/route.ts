import * as express from "express";
import { v1Routes } from "./v1/v1Router";

export const routes = express.Router();

routes.use("/v1", v1Routes);
