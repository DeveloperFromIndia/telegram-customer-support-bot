import accessMiddleware from "@/middleware/access";
import callService from "@/services/call.service";
import { hears } from "@grammyjs/i18n";
import { Bot } from "grammy";
import { type ConfigContext } from "i18n/config";

const clientsMessage = (bot: Bot<ConfigContext>) => {
    bot.filter(hears("request_call"), async (ctx) => {
        const telegramId = ctx.chat.id;
        const [_, status] = await callService.create(null, telegramId);
        if (status) {
            await ctx.reply(ctx.t("concierge-auto-reply"), {
                reply_markup: {
                    remove_keyboard: true
                },
            });
            
        }
    });
};

export default clientsMessage;