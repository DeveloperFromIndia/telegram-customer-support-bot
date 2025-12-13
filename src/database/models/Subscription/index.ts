import { DataTypes } from "sequelize";
import sequelize from "@/database/config";

export enum SUBSCRIPTION_STATUSES {
    active = "active",
    expired = "expired",
    canceled = "canceled",
    pending = "pending",
    trial = "trial",
}

const SubscriptionModel = sequelize.define("subscription", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    telegramId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    status: {
        type: DataTypes.ENUM(DataTypes.ENUM(...Object.values(SUBSCRIPTION_STATUSES))),
        defaultValue: SUBSCRIPTION_STATUSES.pending
    },
    tarifId: { type: DataTypes.INTEGER, allowNull: false },
    current_period_start: { type: DataTypes.DATE, allowNull: false },
    current_period_end: { type: DataTypes.DATE, allowNull: false },
});

export default SubscriptionModel;