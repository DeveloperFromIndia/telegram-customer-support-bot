import paginatedData from "@/bot/keyboards/inline/pagination";
import accessMiddleware from "@/middleware/access";
import userService from "@/services/user.service";
import type { paginationDataType } from "@/utils/pagination";
import { hears } from "@grammyjs/i18n";
import type { Bot } from "grammy";
import type { ConfigContext } from "i18n/config";


const messageManagerUserActions = (bot: Bot<ConfigContext>) => {
    bot.filter(hears("clients"), accessMiddleware, async (ctx) => {
        const params: paginationDataType = { page: 1, count: 5, url: "p_user", filters: { isManager: false } }
        const res = await userService.getPage(params);

        const format = (item: any) => `${item.phone} - ${item.username}`;
        const kb = paginatedData(1, format, res);

        return await ctx.reply(`${res.page} из ${res.total_pages}`, {
            reply_markup: kb,
        });
    });
}

export default messageManagerUserActions;
