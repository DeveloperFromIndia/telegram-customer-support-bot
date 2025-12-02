import { phoneRequestKeyboard } from "@/bot/keyboards/reply/phoneRequest.keyboard";
import { profileActionsKeyboard } from "@/bot/keyboards/reply/profileActions.keyboard";
import userService from "@/services/user.service";
import { Bot } from "grammy";
import { type ConfigContext } from "i18n/config";
import { type UserDto } from "@/dto/user.dto";

const startCommand = (bot: Bot<ConfigContext>) => {
    bot.command("start", async (ctx) => {
        const telegramId = ctx.message?.from.id;
        if (!telegramId)
            return ctx.reply("Something went wrong");

        const [result, _] = await userService.create({ telegramId });

        // Registration
        if (result.idInCRM < 0) {
            return await ctx.reply(ctx.t("request_contact_title"), {
                reply_markup: phoneRequestKeyboard(ctx.t)
            });
        }
        else { // Send keyboard to user
            // проверка подписки
            return await ctx.reply(ctx.t("profile_actions_title"), {
                reply_markup: await profileActionsKeyboard(ctx.t, telegramId)
            });
        }
    });
};

export default startCommand;