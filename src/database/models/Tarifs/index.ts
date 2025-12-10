import { DataTypes } from "sequelize";
import sequelize from "@/database/config";

const TarifModel = sequelize.define("tarif", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    price: { type: DataTypes.DECIMAL(2), defaultValue: 0 },
    days: { type: DataTypes.INTEGER, defaultValue: 1 },
});

export default TarifModel;