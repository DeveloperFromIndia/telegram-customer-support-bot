import { DataTypes } from "sequelize";
import sequelize from "@/database/config";

const CallModel = sequelize.define("bot_call", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    clientId: { type: DataTypes.INTEGER, allowNull: false },
    managerId: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.BOOLEAN, defaultValue: true },
    title: { type: DataTypes.STRING },
});

export default CallModel;