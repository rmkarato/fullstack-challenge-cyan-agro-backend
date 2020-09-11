import { Request, Response } from "express";
import { AddressInfo } from "net";
const express = require("express");

const userRouter = require("./routes/userRouter");
const millsRouter = require("./routes/millsRouter");
const harvestsRouter = require("./routes/harvestsRouter");
const farmsRouter = require("./routes/farmsRouter");
const fieldsRouter = require("./routes/fieldsRouter");

const connection = require("./database");

const app = express();

app.use(express.json());
app.use("/user", userRouter);
app.use("/mills", millsRouter);
app.use("/harvests", harvestsRouter);
app.use("/farms", farmsRouter);
app.use("/fields", fieldsRouter);

app.get("/test", async (req: Request, res: Response) => {
    try {
      res.status(200).send("Server is working");
    } catch (error) {
      res.status(400).send("ERRO");
    }
});

//Testing DB
connection.authenticate()
    .then(() => console.log("Connection with database has been established successfully."))
    .catch((error :any) => console.log("Unable to connect to the database:" + error))
  
const server = app.listen(process.env.PORT || 3003, () => {
if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
} else {
    console.error(`Failure upon starting server.`);
}});
  