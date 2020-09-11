import express from "express";
const FieldsController = require("../controllers/FieldsController");

const fieldsRouter = express.Router();

fieldsRouter.post("/:farm_id/register", FieldsController.registerField);
fieldsRouter.get("/all", FieldsController.getAllFields);

module.exports = fieldsRouter;