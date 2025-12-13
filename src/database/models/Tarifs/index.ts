import { DataTypes } from "sequelize";
import sequelize from "@/database/config";

const TarifModel = sequelize.define("tarif", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, defaultValue: "nameless" },
    price: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    periodMonths: { type: DataTypes.INTEGER, defaultValue: 1 },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: false },
});

export default TarifModel;