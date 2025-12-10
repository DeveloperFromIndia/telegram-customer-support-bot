import { actionsOnTheClient } from "@/bot/keyboards/inline/clients";
import paginatedData from "@/bot/keyboards/inline/pagination";
import clientView from "@/bot/view/clients";
import userService from "@/services/user.service";
import type { paginationDataType } from "@/utils/pagination";
import type { Bot } from "grammy";
import type { ConfigContext } from "i18n/config";


const callbackManagerUserActions = (bot: Bot<ConfigContext>) => {
    bot.callbackQuery(/^(\d+):p_user$/, async (ctx) => {
        try {
            const telegramId = Number(ctx.match[1]);
            const user = await userService.find(telegramId);

            if (user) {
                await ctx.reply(clientView(user, ctx.t), {
                    reply_markup: actionsOnTheClient({ telegramId, blocked: user.blocked }, ctx.t)
                });
            }

            await ctx.answerCallbackQuery();
        } catch (error) {

        }
    });

    bot.callbackQuery(/^p_user:(\d+)$/, async (ctx: any) => {
        try {
            const pageNumber = parseInt(ctx.match[1], 10);

            const params: paginationDataType = { page: pageNumber, count: 5, url: "p_user" };
            const res = await userService.getPage(params);

            const format = (item: any) => `${item.days} - ${item.price}$`;
            const kb = paginatedData(pageNumber, format, res);

            await ctx.answerCallbackQuery();
            
            await ctx.editMessageText(`${res.page} из ${res.total_pages}`, {
                reply_markup: kb,
            });
        } catch (error) {

        }
    });

    // Blocking
    bot.callbackQuery(/^(\d+):b_user$/, async (ctx) => {
        try {
            const id = Number(ctx.match[1]);
            const user = await userService.find(id);
            const updateDataSet = {
                id,
                blocked: !user.blocked,
            };
            const res = await userService.update(updateDataSet);
            if (res) {
                try {
                    await ctx.editMessageText(clientView(res, ctx.t), {
                        reply_markup: actionsOnTheClient({ telegramId: id, blocked: !user.blocked }, ctx.t)
                    });
                } catch (error) {
                    // catching messages about zero fields editing 
                }
            }

            await ctx.answerCallbackQuery();
        } catch (error) {

        }
    });
}

export default callbackManagerUserActions;
