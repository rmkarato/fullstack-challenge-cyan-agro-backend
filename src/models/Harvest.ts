const { Model, DataTypes } = require("sequelize");
require('dotenv').config();

class Harvests extends Model {
    static init(connection: any) {
        super.init({
            id: {
                allowNull: false,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
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

    static associate(models: any) {
        this.belongsTo(models.Mills, { foreignKey: 'mill_id', as: 'mill' });
    }
}

module.exports = Harvests;