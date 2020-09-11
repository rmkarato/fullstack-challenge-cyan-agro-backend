"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const HashManager_1 = require("../services/HashManager");
const Authenticator_1 = require("../services/Authenticator");
const User = require("../models/User");
module.exports = {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                yield User.create({ name, email, password });
                res
                    .status(200)
                    .send({
                    message: "User created succesfully."
                });
            }
            catch (error) {
                res
                    .status(400)
                    .send({
                    message: error.message,
                });
            }
        });
    },
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User.findAll();
                return res.json(users);
            }
            catch (error) {
                res
                    .status(400)
                    .send({
                    message: error.message,
                });
            }
        });
    },
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield User.findOne({
                    where: {
                        email: req.body.email
                    }
                });
                const hashManager = new HashManager_1.HashManager();
                const isPasswordCorrect = yield hashManager.compare(password, user.password);
                if (!isPasswordCorrect) {
                    throw new Error("Incorrect e-mail or password.");
                }
                const authenticator = new Authenticator_1.Authenticator();
                const token = authenticator.generateToken({
                    id: user.id,
                });
                res
                    .status(200)
                    .send({
                    message: "User logged succesfully.",
                    token
                });
            }
            catch (error) {
                res
                    .status(400)
                    .send({
                    message: error.message,
                });
            }
        });
    }
};
