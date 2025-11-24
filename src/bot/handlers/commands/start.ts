import { phoneRequestKeyboard } from "@/bot/keyboards/reply/phoneRequest.keyboard";
import userService from "@/services/user.service";
import { Bot } from "grammy";
import { type ConfigContext } from "i18n/config";

const startCommand = (bot: Bot<ConfigContext>) => {
    bot.command("start", async (ctx) => {
        const telegramId = ctx.message?.from.id;
        if (!telegramId)
            return ctx.reply("Something went wrong");


        const [result, _] = await userService.create(telegramId);

        // Registration is system
        if (!result.isInCRM)
            return await ctx.reply(ctx.t("request_contact_title"), {
                reply_markup: phoneRequestKeyboard(ctx.t)
            });
        else { // Send keyboard to user

        }
    });
};

export default startCommand;