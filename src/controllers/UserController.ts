import { Request, Response } from "express";

const User = require("../models/User")

module.exports = {
    async signup (req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;

            await User.create({ name, email, password });
            
            res
                .status(200)
                .send({
                    message: "User created succesfully."
                })
        } catch(error) {
            res
                .status(400)
                .send({
                    message: error.message,
                });
        }
    },

    async getAllUsers (req: Request, res: Response) {
        try {
            const users = await User.findAll();

            return res.json(users)
        } catch(error) {
            res
                .status(400)
                .send({
                    message: error.message,
                });
        }
    },

    async login (req: Request, res: Response) {
        try {
            

        } catch(error) {
            res
                .status(400)
                .send({
                    message: error.message,
                });
        }
    }
};