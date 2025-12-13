
import { profileActionsView } from "@/bot/view/profile";
import { paginatedCalls } from "@/bot/view/calls";
import accessMiddleware from "@/middleware/access";
import callService from "@/services/call.service";
import { sendMessage } from "@/utils/messages";
import type { paginationDataType } from "@/utils/pagination";
import { hears } from "@grammyjs/i18n";
import type { Bot } from "grammy";
import type { ConfigContext } from "i18n/config";


const messageManagerCallActions = (bot: Bot<ConfigContext>) => {
    bot.filter(hears("calls"), accessMiddleware, async (ctx) => {
        const params: paginationDataType = { page: 1, count: 5, url: "p_call", filters: { status: "waiting" } }
        const res = await callService.getPage(params);

        const kb = await paginatedCalls(1);

        return await ctx.reply(`${res.page} из ${res.total_pages}`, {
            reply_markup: kb,
        });
    });
    bot.filter(hears("calls_action_finish"), accessMiddleware, async (ctx) => {
        const telegramId = Number(ctx.chat.id);
        const call = await callService.inCall(telegramId);

        if (call) {
            await callService.update({ id: call.id, status: "finish" });
            const [text, kb] = await profileActionsView(ctx.t, telegramId);
            await ctx.reply(text, {
                reply_markup: kb,
            });

            const [client_text, client_kb] = await profileActionsView(ctx.t, call.clientId)
            await sendMessage(call.clientId, { text: client_text }, client_kb);
        }
    });
}

export default messageManagerCallActions;
