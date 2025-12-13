import paginatedData from "@/bot/keyboards/inline/pagination";
import tarifService from "@/services/tarif.service";
import type { paginationDataType } from "@/utils/pagination";
import type { Bot } from "grammy";
import type { ConfigContext } from "i18n/config";


const callbackManagerTarifActions = (bot: Bot<ConfigContext>) => {
    bot.callbackQuery(/^(\d+):p_tarif$/, async (ctx) => {
        try {
            const id = Number(ctx.match[1]);
            const tarif = await tarifService.find(id);
            if (tarif) {
                await ctx.reply(tarif);
            }

            await ctx.answerCallbackQuery();
        } catch (error) {

        }
    });
    bot.callbackQuery(/^p_tarif:(\d+)$/, async (ctx: any) => {
        try {
            const pageNumber = parseInt(ctx.match[1], 10);

            const params: paginationDataType = { page: pageNumber, count: 5, url: "p_tarif" };
            const res = await tarifService.getPage(params);

            const format = (item: any) => `${item.name} (${item.periodMonths}) - ${item.price} ₴`;
            const kb = paginatedData(pageNumber, format, res, [
                { text: ctx.t("add_tarifs"), callback_data: "a_tarif" }
            ]);

            await ctx.answerCallbackQuery();

            await ctx.editMessageText(`${res.page} из ${res.total_pages}`, {
                reply_markup: kb,
            });
        } catch (error) {

        }
    });
    bot.callbackQuery("a_tarif", async (ctx: any) => {
        try {
            ctx.session.t = ctx.t;
            await ctx.conversation.enter("createTarifConversation");
            await ctx.answerCallbackQuery();
        } catch (error) {

        }
    });
}

export default callbackManagerTarifActions;