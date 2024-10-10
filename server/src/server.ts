import express, { Express, Request, Response } from "express";

import bcrypt from "bcrypt";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { routes } from "./routes/route";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api", routes);

app.use(express.static(path.join(__dirname, "..", "public")));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.use((req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

const generatePassword = function (pass: string) {
  return console.log(bcrypt.hashSync(pass, 10));
};
