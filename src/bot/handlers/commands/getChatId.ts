import accessMiddleware from "@/middleware/access";
import { Bot } from "grammy";
import { type ConfigContext } from "i18n/config";

const getChatIdCommand = (bot: Bot<ConfigContext>) => {
    bot.command("getChatId", accessMiddleware, async (ctx) => {
        console.log(ctx.chat.id)
    });
};

export default getChatIdCommand;