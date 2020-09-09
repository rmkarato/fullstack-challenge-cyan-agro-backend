import { Request, Response } from "express";

const Harvest = require("../models/Harvest");
const Mill = require("../models/Mill");

module.exports = {
    async registerHarvest (req: Request, res: Response) {
        try {
            const { mill_id } = req.params;
            const { start_date, end_date } = req.body;

            const token = req.headers.authorization as string;

            const mill = await Mill.findByPk(mill_id);

            if(!mill_id) {
                return res.status(400).json({ error: "Mill not found."})
            }

            const harvest = await Harvest.create({
                mill_id,
                start_date,
                end_date
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