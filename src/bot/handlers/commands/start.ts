import { Bot, Context } from "grammy";

const startCommand = (bot: Bot<Context>) => {
    bot.command("start", async (ctx) => {
        await ctx.reply("Bot started");
    });
};

export default startCommand;