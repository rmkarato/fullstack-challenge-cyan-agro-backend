import express from "express";
const FarmsController = require("../controllers/FarmsController");

const farmsRouter = express.Router();

farmsRouter.post("/:harvest_id/register", FarmsController.registerFarm);
farmsRouter.get("/all", FarmsController.getAllFarms);

module.exports = farmsRouter;