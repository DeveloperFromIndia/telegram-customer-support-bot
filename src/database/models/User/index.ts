import { DataTypes } from "sequelize";
import sequelize from "@/database/config";

const UserModel = sequelize.define("user_info", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    telegramId: { type: DataTypes.INTEGER, unique: true },
    name: { type: DataTypes.STRING, allowNull: true },
    username: { type: DataTypes.STRING, allowNull: true },
    address: { type: DataTypes.STRING, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: true },
    blocked: { type: DataTypes.BOOLEAN, defaultValue: false },
    idInCRM: { type: DataTypes.INTEGER, defaultValue: -1 },
    isManager: { type: DataTypes.BOOLEAN, defaultValue: false }
});

export default UserModel;