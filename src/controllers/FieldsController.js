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
const Field = require("../models/Field");
const Farm = require("../models/Farm");
module.exports = {
    registerField(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { farm_id } = req.params;
                const authenticator = new Authenticator_1.Authenticator();
                const token = authenticator.getData(req.headers.authorization);
                const point = { type: 'Point', coordinates: req.body.gps_coordinates };
                const farm = yield Farm.findByPk(farm_id);
                if (!farm) {
                    return res.status(400).json({ error: "Farm not found." });
                }
                yield Field.create({
                    gps_coordinates: point,
                    farm_id
                });
                res
                    .status(200)
                    .send({
                    message: "Field registered succesfully."
                });
            }
            catch (error) {
                console.log(error);
                res
                    .status(400)
                    .send({
                    message: error.message,
                });
            }
        });
    },
    getAllFields(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authenticator = new Authenticator_1.Authenticator();
                const token = authenticator.getData(req.headers.authorization);
                const fields = yield Field.findAll();
                return res.json(fields);
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
