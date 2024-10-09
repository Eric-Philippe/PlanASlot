import express from "express";
import login from "./login";

export const loginRouter = express.Router();

loginRouter.post("/", login);
