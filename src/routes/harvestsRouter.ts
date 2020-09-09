import express from "express";
const HarvestsController = require("../controllers/HarvestsController");

const harvestsRouter = express.Router();

harvestsRouter.post("/:mill_id/register", HarvestsController.registerHarvest);
harvestsRouter.get("/all", HarvestsController.getAllHarvests);