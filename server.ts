import express , { Request, Response } from "express";
import dbConnect from "./db/dbConnect";
import { config } from "dotenv";
import router from "./routers";

config();
const PORT = Number(process.env.PORT) || 3000; // parseando, le digo que es del tipo numero
const HOST = process.env.HOST || "localhost";
const app = express ();

app.use(express.json());

app.use("/api", router)

dbConnect(); //me conecto a la base de dato abstraida

app.listen (PORT, HOST, ()=>{
  console.log (`server is runnin en http://${HOST}:${PORT}`);
})

