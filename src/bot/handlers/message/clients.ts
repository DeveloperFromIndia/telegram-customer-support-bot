import { hears } from "@grammyjs/i18n";
import { Bot } from "grammy";
import { type ConfigContext } from "i18n/config";

const clientsMessage = (bot: Bot<ConfigContext>) => {
    bot.filter(hears("clients"), async (ctx) => {
        ctx.reply("darou");
    });
};

export default clientsMessage;