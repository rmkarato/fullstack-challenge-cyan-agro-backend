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
const Authenticator_1 = require("../services/Authenticator");
const Mill = require("../models/Mill");
module.exports = {
    registerMill(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.body;
                const authenticator = new Authenticator_1.Authenticator();
                const token = authenticator.getData(req.headers.authorization);
                yield Mill.create({ name });
                res
                    .status(200)
                    .send({
                    message: "Mill registered succesfully."
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
    getAllMills(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authenticator = new Authenticator_1.Authenticator();
                const token = authenticator.getData(req.headers.authorization);
                const mills = yield Mill.findAll();
                return res.json(mills);
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
