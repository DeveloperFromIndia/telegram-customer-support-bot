import 'dotenv/config';
import setupBot from "@/bot/index.ts";
import sequelize from "@/database/config.ts";

(async function () {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        const bot = setupBot();
        
        bot.start()

        console.log("</ Bot launched successfully >");
    } catch (error) {
        console.error(error);
    }
})();