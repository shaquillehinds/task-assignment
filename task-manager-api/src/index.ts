import dotenv from "dotenv";
dotenv.config();
import http, { Server } from "http";
import path from "path";
import { AddressInfo } from "net";
import cors from "cors";
import express, { Application } from "express";
import connectMongo from "./database/connect";
import tasksRouter from "./routers/tasksRoute";

export const app: Application = express();

const server: Server = http.createServer(app);

connectMongo();

// creating a static route to the public directory
const pubDir = path.join(__dirname, "../public");

app.use(cors());
app.use(express.static(pubDir));
app.use(express.json());

app.get("/", (req, res) => res.status(200).sendFile(`${pubDir}/index.html`));

app.use("/tasks", tasksRouter);

const PORT = process.env.PORT || 4000;

//extracting address for testing purposes
export const SCSAdress = server
  .listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))
  .address() as AddressInfo;
