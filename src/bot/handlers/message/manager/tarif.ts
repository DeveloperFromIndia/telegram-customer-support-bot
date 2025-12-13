
import paginatedData from "@/bot/keyboards/inline/pagination";
import accessMiddleware from "@/middleware/access";
import tarifService from "@/services/tarif.service";
import type { paginationDataType } from "@/utils/pagination";
import { hears } from "@grammyjs/i18n";
import type { Bot } from "grammy";
import type { ConfigContext } from "i18n/config";


const messageManagerTarifActions = (bot: Bot<ConfigContext>) => {
    bot.filter(hears("tarifs"), accessMiddleware, async (ctx) => {
        const params: paginationDataType = { page: 1, count: 5, url: "p_tarif" }
        const res = await tarifService.getPage(params);

        const format = (item: any) => `${item.name} [${item.periodMonths}m.]  - ${item.price} ₴`;
        const kb = paginatedData(1, format, res, [
            { text: ctx.t("add_tarifs"), callback_data: "a_tarif" }
        ]);

        return await ctx.reply(`${res.page} из ${res.total_pages}`, {
            reply_markup: kb,
        });
    });
}

export default messageManagerTarifActions;
