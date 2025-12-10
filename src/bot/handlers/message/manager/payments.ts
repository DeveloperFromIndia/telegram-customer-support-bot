import accessMiddleware from "@/middleware/access";
import type { paginationDataType } from "@/utils/pagination";
import { hears } from "@grammyjs/i18n";
import type { Bot } from "grammy";
import type { ConfigContext } from "i18n/config";


const messageManagerPaymentsActions = (bot: Bot<ConfigContext>) => {
    bot.filter(hears("payments"), accessMiddleware, async (ctx) => {
        return await ctx.reply("functional not implemented");
    });
}

export default messageManagerPaymentsActions;

