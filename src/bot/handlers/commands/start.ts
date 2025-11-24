import { Bot } from "grammy";
import { type ConfigContext } from "i18n/config";

const startCommand = (bot: Bot<ConfigContext>) => {
    bot.command("start", async (ctx) => {
        await ctx.reply(ctx.t("start"));
    });
};

export default startCommand;