import 'dotenv/config';
import setupBot from "@/bot/index.ts";
import sequelize from "@/database/config.ts";

// Commands
import HandlersWrapper from "@/bot/handlers/wrapper";
// 
import startCommand from '@/bot/handlers/commands/start';

(async function () {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        const bot = setupBot();

        HandlersWrapper([
            startCommand
        ], bot);
        bot.start()

        console.log("</ Bot launched successfully >");
    } catch (error) {
        console.error(error);
    }
})();