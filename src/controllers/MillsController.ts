import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";

const Mill = require("../models/Mill");

module.exports = {
    async registerMill (req: Request, res: Response) {
        try {
            const { name } = req.body;
    
            const authenticator = new Authenticator();
            const token = authenticator.getData(
                req.headers.authorization as string
            );

            await Mill.create({ name });
            
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
            const authenticator = new Authenticator();
            const token = authenticator.getData(
                req.headers.authorization as string
            );
            
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