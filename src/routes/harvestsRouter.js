"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const HarvestsController = require("../controllers/HarvestsController");
const harvestsRouter = express_1.default.Router();
harvestsRouter.post("/:mill_id/register", HarvestsController.registerHarvest);
harvestsRouter.get("/all", HarvestsController.getAllHarvests);
module.exports = harvestsRouter;
