import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";

const Harvest = require("../models/Harvest");
const Mill = require("../models/Mill");

module.exports = {
    async registerHarvest (req: Request, res: Response) {
        try {
            const { mill_id } = req.params;
            
            const { start_date, end_date } = req.body;

            const authenticator = new Authenticator();
            const token = authenticator.getData(
                req.headers.authorization as string
            );

            const mill = await Mill.findByPk(mill_id);

            if(!mill) {
                return res.status(400).json({ error: "Mill not found."})
            }

            await Harvest.create({
                start_date,
                end_date,
                mill_id
            });

            res 
                .status(200)
                .send({
                    message: "Harvest registered succesfully."
                })
        } catch(error) {
            res
                .status(400)
                .send({
                    message: error.message,
                });
        }
    },

    async getAllHarvests (req: Request, res: Response) {
        try {
            const harvests = await Harvest.findAll();

            return res.json(harvests)

        } catch(error) {
            res
                .status(400)
                .send({
                    message: error.message,
                });
        }
    },
};