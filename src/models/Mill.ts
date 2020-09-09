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
                    msg: 'Looks like you already have an mill with this name. Please try to login.',
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
        this.hasMany(models.Harvests, { foreignKey: 'mill_id', as: 'mill' });
    }
}

module.exports = Mill;