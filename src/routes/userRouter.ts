import { Request, Response } from "express";
const express = require("express");

const userRouter = express.Router();

userRouter.get("/", (req: Request, res: Response) => {
    return res.json({ hello: "World" });
})

module.exports = userRouter;
