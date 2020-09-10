"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MillsController = require("../controllers/MillsController");
const millsRouter = express_1.default.Router();
millsRouter.post("/register", MillsController.registerMill);
millsRouter.get("/all", MillsController.getAllMills);
module.exports = millsRouter;
