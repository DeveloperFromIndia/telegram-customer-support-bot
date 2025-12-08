import { callView } from "@/bot/view/calls";
import clientView from "@/bot/view/clients";
import accessMiddleware from "@/middleware/access";
import callService from "@/services/call.service";
import userService from "@/services/user.service";
import { sendMessage } from "@/utils/messages";
import { hears } from "@grammyjs/i18n";
import { Bot } from "grammy";
import { type ConfigContext } from "i18n/config";

const GROUP_ID = Number(process.env.NOTIFICATION_GROUP_ID);

const clientsMessage = (bot: Bot<ConfigContext>) => {
    bot.filter(hears("request_call"), async (ctx) => {
        const telegramId = Number(ctx.chat.id);

        const user = await userService.find(telegramId);
        const [call, status] = await callService.create(null, telegramId);
        
        if (status && call) {
            await ctx.reply(ctx.t("concierge-auto-reply"), {
                reply_markup: {
                    remove_keyboard: true
                },
            });

            if (!GROUP_ID)
                return console.error("notification not working");

            return await sendMessage(GROUP_ID, {text: callView({ ...call, client: user }, ctx.t)});
        }
    });
};

export default clientsMessage;