import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";

const Farm = require("../models/Farm");
const Harvest = require("../models/Harvest");

module.exports = {
    async registerFarm (req: Request, res: Response) {
        try {
            const { harvest_id } = req.params;

            const { name } = req.body;

            const authenticator = new Authenticator();
            const token = authenticator.getData(
                req.headers.authorization as string
            );

            const harvest = await Harvest.findByPk(harvest_id);

            if(!harvest) {
                return res.status(400).json({ error: "Harvest not found."})
            }

            await Farm.create({
                name,
                harvest_id
            })

            res 
                .status(200)
                .send({
                    message: "Farm registered succesfully."
                })
        } catch(error) {
            res
                .status(400)
                .send({
                    message: error.message,
                });
        }
    },

    async getAllFarms (req: Request, res: Response) {
        try {
            const authenticator = new Authenticator();
            const token = authenticator.getData(
                req.headers.authorization as string
            );
            
            const farms = await Farm.findAll();
            
            return res.json(farms)

        } catch(error) {
            res
                .status(400)
                .send({
                    message: error.message,
                });
        }
    },
};