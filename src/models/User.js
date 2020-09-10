"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Model, DataTypes } = require("sequelize");
const Authenticator_1 = require("../services/Authenticator");
const bcrypt = __importStar(require("bcryptjs"));
require('dotenv').config();
class User extends Model {
    static init(connection) {
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
        User.beforeSave((user, options) => {
            if (user.changed('password')) {
                user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
            }
        });
        const authenticator = new Authenticator_1.Authenticator();
        User.prototype.generateToken = function generateToken() {
            console.log('JWT:' + process.env.JWT_KEY);
            return authenticator.generateToken({ id: this.id });
        };
        User.prototype.authenticate = function authenticate(value) {
            if (bcrypt.compareSync(value, this.password))
                return this;
            else
                return false;
        };
    }
}
module.exports = User;
