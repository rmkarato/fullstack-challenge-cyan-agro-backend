import { Request, Response } from "express";
import { AddressInfo } from "net";
const express = require("express");
const userRouter = require("./routes/userRouter")
const connection = require("./database")

//Testing DB
connection.authenticate()
    .then(() => console.log("Database connected."))
    .catch(error => console.log("Error:" + error))

const app = express();

app.use(express.json());
app.use(userRouter)

app.get("/test", async (req: Request, res: Response) => {
    try {
      res.status(200).send("Server is working");
    } catch (error) {
      res.status(400).send("ERRO");
    }
});
  
const server = app.listen(process.env.PORT || 3000, () => {
if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
} else {
    console.error(`Failure upon starting server.`);
}});
  