import { Bot } from "grammy";

const bot = process.env.BOT_TOKEN ? new Bot(process.env.BOT_TOKEN) : null;

const setupBot = () => {
    if (!bot)
        throw console.error("Token not found");

    return bot;
}
export default setupBot;