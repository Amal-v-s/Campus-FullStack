import bcrypt from "bcrypt";
import { DataTypes, Model, } from "sequelize";
import { sequelize } from "../db/connection.js";
export class User extends Model {
    async comparePassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
    static async hashPassword(password) {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }
}
User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
        set(value) {
            this.setDataValue("email", value.trim().toLowerCase());
        },
    },
    password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM("admin", "faculty", "student"),
        allowNull: false,
        defaultValue: "student",
    },
    must_change_password: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    token_version: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 1,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    tableName: "users",
    underscored: true,
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ["email"],
        },
    ],
});
