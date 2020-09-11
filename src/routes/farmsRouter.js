"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const FarmsController = require("../controllers/FarmsController");
const farmsRouter = express_1.default.Router();
farmsRouter.post("/:harvest_id/register", FarmsController.registerFarm);
farmsRouter.get("/all", FarmsController.getAllFarms);
module.exports = farmsRouter;
