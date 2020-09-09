import { Request, Response } from "express";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";

const User = require("../models/User");

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
            const { email, password } = req.body;

            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            })

            const hashManager = new HashManager();

            const isPasswordCorrect = await hashManager.compare(
                password,
                user.password
            );
          
            if (!isPasswordCorrect) {
            throw new Error("Incorrect e-mail or password.");
            }

            const authenticator = new Authenticator();
            const token = authenticator.generateToken({
                id: user.id,
            });

            res
                .status(200)
                .send({
                    message: "User logged succesfully.",
                    token
                })
            
        } catch(error) {
            res
                .status(400)
                .send({
                    message: error.message,
                });
        }
    }
};