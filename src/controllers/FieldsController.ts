import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";

const Field = require("../models/Field");
const Farm = require("../models/Farm");

module.exports = {
    async registerField (req: Request, res: Response) {
        try {
            const { farm_id } = req.params;

            const authenticator = new Authenticator();
            const token = authenticator.getData(
                req.headers.authorization as string
            );
            
            const point = { type: 'Point', coordinates: req.body.gps_coordinates };

            const farm = await Farm.findByPk(farm_id);

            if(!farm) {
                return res.status(400).json({ error: "Farm not found."})
            }

            await Field.create({
                gps_coordinates: point,
                farm_id
            })

            res 
                .status(200)
                .send({
                    message: "Field registered succesfully."
                })
        } catch(error) {
            console.log(error)
            res
                .status(400)
                .send({
                    message: error.message,
                });
        }
    },

    async getAllFields (req: Request, res: Response) {
        try {
            const authenticator = new Authenticator();
            const token = authenticator.getData(
                req.headers.authorization as string
            );

            const fields = await Field.findAll();

            return res.json(fields)

        } catch(error) {
            res
                .status(400)
                .send({
                    message: error.message,
                });
        }
    },
};