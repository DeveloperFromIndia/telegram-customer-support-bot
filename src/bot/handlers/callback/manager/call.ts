import { actionsOnTheCall } from "@/bot/keyboards/inline/calls";
import paginatedData from "@/bot/keyboards/inline/pagination";
import { actionsInTheCall } from "@/bot/keyboards/reply/callsActions.keyboard";
import { callView } from "@/bot/view/calls";
import callService from "@/services/call.service";
import userService from "@/services/user.service";
import type { paginationDataType } from "@/utils/pagination";
import type { Bot } from "grammy";
import type { ConfigContext } from "i18n/config";


const callbackManagerCallActions = (bot: Bot<ConfigContext>) => {
    // Connect in call
    bot.callbackQuery(/^(\d+):c_call$/, async (ctx) => {
        const telegramId = Number(ctx.chat?.id);
        try {
            const id = Number(ctx.match[1]);
            const call = await callService.find(id);

            if (call && call.managerId === null || call.managerId === telegramId) {
                const updateRes = await callService.update({
                    id: call.id,
                    managerId: telegramId,
                    status: "open",
                })

                if (updateRes) {
                    await ctx.deleteMessage();
                    // Подгрузить архив сообщений
                    return await ctx.reply("wellcome in chat hardcode message", {
                        reply_markup: actionsInTheCall(ctx.t),
                    });
                }

            }

            await ctx.answerCallbackQuery();
        } catch (error) {
            await ctx.answerCallbackQuery();
        }
    });
    // Get call info
    bot.callbackQuery(/^(\d+):p_call$/, async (ctx) => {
        try {
            const id = Number(ctx.match[1]);
            const call = await callService.find(id);
            const client = await userService.find(call.clientId);

            if (call) {
                const text = callView({ ...call, client }, ctx.t);
                await ctx.reply(text || "test", {
                    reply_markup: actionsOnTheCall(call.id, ctx.t)
                });
            }

            await ctx.answerCallbackQuery();
        } catch (error) {
            await ctx.answerCallbackQuery();
        }
    });
    bot.callbackQuery(/^p_call:(\d+)$/, async (ctx: any) => {
        try {
            const pageNumber = parseInt(ctx.match[1], 10);

            const params: paginationDataType = { page: pageNumber, count: 5, url: "p_call", filters: { status: "waiting" } }
            const res = await callService.getPage(params);

            const format = (item: any) => `${item.days} - ${item.price}$`;
            const kb = paginatedData(pageNumber, format, res);

            await ctx.answerCallbackQuery();

            await ctx.editMessageText(`${res.page} из ${res.total_pages}`, {
                reply_markup: kb,
            });
        } catch (error) {

        }
    });
}

export default callbackManagerCallActions;