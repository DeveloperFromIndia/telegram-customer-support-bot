import { DataTypes } from "sequelize";
import sequelize from "@/database/config";


const PaymentModel = sequelize.define("payment", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    telegramId: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.INTEGER, allowNull: false },
});

export default PaymentModel;