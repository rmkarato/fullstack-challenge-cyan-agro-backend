export {};
const { Model, DataTypes } = require("sequelize");
require('dotenv').config();

class Mill extends Model {
    static init(connection: any) {
        super.init({
            id: {
                allowNull: false,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: {
                    args: true,
                    msg: 'Looks like you already have a mill with this name.',
                },               
            },
        }, {
            indexes: [
                {
                unique: true, 
                fields: ['name']
                }
            ],
            timestamps: true,
            freezeTableName: true,
            sequelize: connection,
            tableName: "Mills"
        });
    }

    static associate(models: any) {
        this.hasMany(models.Harvest, { foreignKey: 'mill_id', as: 'Harvests' });
    }
}

module.exports = Mill;