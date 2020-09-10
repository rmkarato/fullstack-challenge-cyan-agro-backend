export {};
const { Model, DataTypes } = require("sequelize");
import { Authenticator } from "../services/Authenticator";
import * as bcrypt from "bcryptjs";
require('dotenv').config();

class User extends Model {
    static init(connection :any) {
        super.init({
            id: {
                allowNull: false,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            }, 
            name: {
                allowNull: false,
                type: DataTypes.STRING
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING,
                validate: {
                    len: {
                    args: [6, 128],
                    msg: 'Email address must be between 6 and 128 characters in length'
                    },
                    isEmail: {
                    msg: 'Email address must be valid'
                    }
                },
                unique: {
                    args: true,
                    msg: 'Looks like you already have an account with this email address. Please try to login.',
                },
            },
            password: {
                allowNull: false,
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true,
                    len: [6, 100]
                }
            },
        }, {
            indexes: [
                {
                unique: true, 
                fields: ['email']
                }
            ],
            timestamps: true,
            freezeTableName: true,
            sequelize: connection,
            tableName: "Users"
        });

        User.beforeSave((user: any, options: any) :any => {
            if (user.changed('password')) {
                user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
            }
        })

        const authenticator = new Authenticator();

        User.prototype.generateToken = function generateToken() {
            console.log('JWT:' + process.env.JWT_KEY)
            return authenticator.generateToken({ id: this.id})
        }

        User.prototype.authenticate = function authenticate(value :any) {
            if (bcrypt.compareSync(value, this.password))
                return this
            else
                return false
        }
    }
}

module.exports = User;