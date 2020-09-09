const { Model, DataTypes } = require("sequelize");
require('dotenv').config();

class Field extends Model {
    static init(connection: any) {
        super.init({
            id: {
                allowNull: false,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            farm_id: {
                allowNull: false,
                type: DataTypes.UUID,
                references: { model: 'Harvests', key: 'id'},
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            gps_coordinates: {
                allowNull: false,
                type: DataTypes.GEOMETRY('POINT'),     
            },
        }, {
            timestamps: true,
            freezeTableName: true,
            sequelize: connection,
            tableName: "Fields"
        })
    }

    static associate(models: any) {
        this.belongsTo(models.Farm, { foreignKey: 'farm_id', as: 'farm' });
    }
}

module.exports = Field;