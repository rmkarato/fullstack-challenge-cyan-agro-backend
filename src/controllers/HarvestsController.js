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
const Harvest = require("../models/Harvest");
const Mill = require("../models/Mill");
module.exports = {
    registerHarvest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { mill_id } = req.params;
                const { start_date, end_date } = req.body;
                const authenticator = new Authenticator_1.Authenticator();
                const token = authenticator.getData(req.headers.authorization);
                const mill = yield Mill.findByPk(mill_id);
                if (!mill) {
                    return res.status(400).json({ error: "Mill not found." });
                }
                yield Harvest.create({
                    start_date,
                    end_date,
                    mill_id
                });
                res
                    .status(200)
                    .send({
                    message: "Harvest registered succesfully."
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
    getAllHarvests(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authenticator = new Authenticator_1.Authenticator();
                const token = authenticator.getData(req.headers.authorization);
                const harvests = yield Harvest.findAll();
                return res.json(harvests);
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
};
