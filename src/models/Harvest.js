"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Model, DataTypes } = require("sequelize");
require('dotenv').config();
class Harvest extends Model {
    static init(connection) {
        super.init({
            id: {
                allowNull: false,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            mill_id: {
                allowNull: false,
                type: DataTypes.UUID,
                references: { model: 'Mills', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            start_date: {
                allowNull: false,
                type: DataTypes.DATEONLY,
            },
            end_date: {
                allowNull: false,
                type: DataTypes.DATEONLY,
            },
        }, {
            timestamps: true,
            freezeTableName: true,
            sequelize: connection,
            tableName: "Harvests"
        });
    }
    static associate(models) {
        this.belongsTo(models.Mill, { foreignKey: 'mill_id', as: 'mill' });
        this.hasMany(models.Farm, { foreignKey: 'harvest_id', as: 'Farms' });
    }
}
module.exports = Harvest;
