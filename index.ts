import 'dotenv/config';
import setupBot from "@/bot/index.ts";
import sequelize from "@/database/config.ts";
import setupModels from '@/database/models';

const bot = setupBot();
setupModels();

(async function () {
    try {
        await sequelize.authenticate();
        await sequelize.sync({});
        bot.start()

        console.log("</ Bot launched successfully >");
    } catch (error) {
        console.error(error);
    }
})();

export default bot;