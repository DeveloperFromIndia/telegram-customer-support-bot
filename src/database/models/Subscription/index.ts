import { DataTypes } from "sequelize";
import sequelize from "@/database/config";

const SubscriptionModel = sequelize.define("subscription", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    telegramId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: "canceled" },
    tarifId: { type: DataTypes.INTEGER, allowNull: false },
    current_period_end: { type: DataTypes.INTEGER, allowNull: false },
});

export default SubscriptionModel;