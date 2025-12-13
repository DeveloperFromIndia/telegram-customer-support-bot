import { phoneRequestKeyboard } from "@/bot/keyboards/reply/phoneRequest.keyboard";
import { profileActionsView } from "@/bot/view/profile";
import userService from "@/services/user.service";
import { Bot } from "grammy";
import { type ConfigContext } from "i18n/config";
import updateRoles from "@/utils/roles";
import subscriptionService from "@/services/subscription.service";

const startCommand = (bot: Bot<ConfigContext>) => {
    bot.command("start", async (ctx) => {
        const telegramId = ctx.message?.from.id;
        if (ctx.conversation) {
            await ctx.conversation.exit("createTarifConversation");
        }
        if (!telegramId)
            return ctx.reply("Something went wrong");

        const [result, _] = await userService.create({ telegramId });
        await updateRoles(telegramId);
        
        // Registration
        if (result.idInCRM < 0) {
            return await ctx.reply(ctx.t("request_contact_title"), {
                reply_markup: phoneRequestKeyboard(ctx.t)
            });
        } else {
            const [text, kb] = await profileActionsView(ctx.t, telegramId)
            return await ctx.reply(text, {
                reply_markup: kb
            });
        }
    });
};

export default startCommand;