import { DataTypes } from "sequelize";
import sequelize from "@/database/config";

/*
    Статусы звоноков
    - Открыт:
    - Закрыт:
*/

const CallModel = sequelize.define("bot_call", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    clientId: { type: DataTypes.INTEGER, allowNull: true },
    managerId: { type: DataTypes.INTEGER, allowNull: true },
    status: { type: DataTypes.STRING, defaultValue: "waiting" },
    title: { type: DataTypes.STRING },
    archiveFile: { type: DataTypes.STRING },
    clientRate: { type: DataTypes.SMALLINT }
});

export default CallModel;