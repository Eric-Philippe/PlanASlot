import express, { Express, Request, Response } from "express";

import bcrypt from "bcrypt";
import cors from "cors";
import bodyParser from "body-parser";
import { routes } from "./routes/route";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api", routes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

const generatePassword = function (pass: string) {
  return console.log(bcrypt.hashSync(pass, 10));
};
