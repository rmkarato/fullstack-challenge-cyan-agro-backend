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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter = require("./routes/userRouter");
const millsRouter = require("./routes/millsRouter");
const harvestsRouter = require("./routes/harvestsRouter");
const farmsRouter = require("./routes/farmsRouter");
const fieldsRouter = require("./routes/fieldsRouter");
const connection = require("./database");
const app = express_1.default();
app.use(express_1.default.json());
app.use("/user", userRouter);
app.use("/mills", millsRouter);
app.use("/harvests", harvestsRouter);
app.use("/farms", farmsRouter);
app.use("/fields", fieldsRouter);
app.get("/test", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send("Server is working");
    }
    catch (error) {
        res.status(400).send("ERRO");
    }
}));
//Testing DB
connection.authenticate()
    .then(() => console.log("Connection with database has been established successfully."))
    .catch((error) => console.log("Unable to connect to the database:" + error));
const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address();
        console.log(`Server is running in http://localhost:${address.port}`);
    }
    else {
        console.error(`Failure upon starting server.`);
    }
});
