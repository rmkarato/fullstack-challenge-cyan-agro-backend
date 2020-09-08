const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const User2 = require("../models/User");

const connection = new Sequelize(dbConfig);

User2.init(connection);

module.exports = connection;