"use strict";
const express = require("express");
const UserController = require("../controllers/UserController");
const userRouter = express.Router();
userRouter.post("/signup", UserController.signup);
userRouter.post("/login", UserController.login);
userRouter.get("/all", UserController.getAllUsers);
module.exports = userRouter;
