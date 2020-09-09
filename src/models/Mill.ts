const { Model, DataTypes } = require("sequelize");
import { Authenticator } from "../services/Authenticator";
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
        })

        const authenticator = new Authenticator();

        Mill.prototype.generateToken = function generateToken() {
            console.log('JWT:' + process.env.JWT_KEY)
            return authenticator.generateToken({ id: this.id})
        }
    }
}

module.exports = Mill;