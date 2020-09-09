import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";

const Mill = require("../models/Mill");

module.exports = {
    async registerMill (req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string;
            console.log(token)

            const { name } = req.body;
            console.log(req.body)

            const mill = await Mill.create({
                name
            });
            
            res
                .status(200)
                .send({
                    message: "Mill registered succesfully."
                });
        } catch(error) {
            res
                .status(400)
                .send({
                    message: error.message,
                });
        }
    },

    async getAllMills (req: Request, res: Response) {
        try {
            const mills = await Mill.findAll();
            
            return res.json(mills)

        } catch(error) {
            res
                .status(400)
                .send({
                    message: error.message,
                });
        }
    }
};