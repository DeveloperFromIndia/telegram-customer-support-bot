import paginatedData from "@/bot/keyboards/inline/pagination";
import { profileActionsKeyboard } from "@/bot/keyboards/reply/profileActions.keyboard";
import accessMiddleware from "@/middleware/access";
import callService from "@/services/call.service";
import userService from "@/services/user.service";
import { sendMessage } from "@/utils/messages";
import type { paginationDataType } from "@/utils/pagination";
import { hears } from "@grammyjs/i18n";
import { Bot } from "grammy";
import { type ConfigContext } from "i18n/config";

const managerMessage = (bot: Bot<ConfigContext>) => {
    bot.filter(hears("calls"), accessMiddleware, async (ctx) => {
        const params: paginationDataType = { page: 1, count: 10, url: "p_call", filters: { status: "waiting" } }
        const res = await callService.getPage(params);

        // include profiile data
        const format = (item: any) => `${item.clientId}`;
        const kb = paginatedData(1, format, res);

        return await ctx.reply("calls", {
            reply_markup: kb,
        });
    });
    bot.filter(hears("clients"), accessMiddleware, async (ctx) => {
        const params: paginationDataType = { page: 1, count: 10, url: "p_user", filters: { isManager: false } }
        const res = await userService.getPage(params);

        const format = (item: any) => `${item.phone} - ${item.username}`;
        const kb = paginatedData(1, format, res);

        return await ctx.reply("clients", {
            reply_markup: kb,
        });
    });
    bot.filter(hears("calls_action_finish"), accessMiddleware, async (ctx) => {
        const telegramId = ctx.chat.id;
        const call = await callService.inCall(telegramId);
        await callService.update({ id: call.id, status: "finish" });
        await ctx.reply("finish hardcode message", {
            reply_markup: await profileActionsKeyboard(ctx.t, telegramId)
        })
        // call end msg
        await sendMessage(call.clientId, "hardcode msg", await profileActionsKeyboard(ctx.t, call.clientId));
    });
    bot.filter(hears("calls_action_rollup"), accessMiddleware, async (ctx) => {
        const telegramId = ctx.chat.id;
        const call = await callService.inCall(telegramId);
        await callService.update({ id: call.id, status: "waiting" });
        await ctx.reply("rollup hardcode message", {
            reply_markup: await profileActionsKeyboard(ctx.t, telegramId)
        })
    });
    bot.filter(hears("tarifs"), accessMiddleware, async (ctx) => {
        return await ctx.reply("functional not implemented");
    });
    bot.filter(hears("payments"), accessMiddleware, async (ctx) => {
        return await ctx.reply("functional not implemented");
    });
};

export default managerMessage;