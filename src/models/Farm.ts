const { Model, DataTypes } = require("sequelize");
require('dotenv').config();

class Farm extends Model {
    static init(connection: any) {
        super.init({
            id: {
                allowNull: false,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            harvest_id: {
                allowNull: false,
                type: DataTypes.UUID,
                references: { model: 'Harvests', key: 'id'},
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: {
                    args: true,
                    msg: 'Looks like you already have a farm with this name.',
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
            tableName: "Farms"
        });
    }

    static associate(models: any) {
        this.belongsTo(models.Harvest, { foreignKey: 'harvest_id', as: 'harvest' });
    }
}

module.exports = Farm;