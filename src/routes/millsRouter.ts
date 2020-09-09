import express from "express";
const MillsController = require("../controllers/MillsController");

const millsRouter = express.Router();

millsRouter.post("/register", MillsController.registerMill)
millsRouter.get("/all", MillsController.getAllMills)


module.exports = millsRouter;