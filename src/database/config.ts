import dotenv from 'dotenv'; dotenv.config();
import { Sequelize } from "sequelize";

const config = new Sequelize(
    {
        dialect: 'sqlite',
        storage: 'src/database/db.sqlite',
        logging: false, 
        define: {
            freezeTableName: true,
            timestamps: true
        },
    }
);

await config.authenticate();
await config.query('PRAGMA foreign_keys = ON;');

export default config;