import accessMiddleware from "@/middleware/access";
import callService from "@/services/call.service";
import { sendMessage } from "@/utils/messages";
import { hears } from "@grammyjs/i18n";
import { Bot } from "grammy";
import { type ConfigContext } from "i18n/config";

const GROUP_ID = Number(process.env.NOTIFICATION_GROUP_ID);

const clientsMessage = (bot: Bot<ConfigContext>) => {
    bot.filter(hears("request_call"), async (ctx) => {
        const telegramId = ctx.chat.id;
        const [_, status] = await callService.create(null, telegramId);
        if (status) {
            console.log("status:", status);            
            await ctx.reply(ctx.t("concierge-auto-reply"), {
                reply_markup: {
                    remove_keyboard: true
                },
            });

            if (!GROUP_ID)
                return console.error("notification not working");
            
            return await sendMessage(GROUP_ID, "test msg");
        }
    });
};

export default clientsMessage;