const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const UserConnection = require("../models/User");
const MillConnection = require("../models/Mill");
const HarvestConnection = require("../models/Harvest");
const FarmConnection = require("../models/Farm");

const connection = new Sequelize(dbConfig);

UserConnection.init(connection);
MillConnection.init(connection);
HarvestConnection.init(connection);
FarmConnection.init(connection);

module.exports = connection;