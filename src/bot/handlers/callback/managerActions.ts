import { actionsOnTheCall } from "@/bot/keyboards/inline/calls";
import { actionsOnTheClient } from "@/bot/keyboards/inline/clients";
import { actionsInTheCall } from "@/bot/keyboards/reply/callsActions.keyboard";
import { callView } from "@/bot/view/calls";
import clientView from "@/bot/view/clients";
import { UserDto } from "@/dto/user.dto";
import accessMiddleware from "@/middleware/access";
import callService from "@/services/call.service";
import userService from "@/services/user.service";
import type { Bot } from "grammy"
import type { ConfigContext } from "i18n/config"



const managerActionsCallback = (bot: Bot<ConfigContext>) => {
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
    // Get user info
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
    // Block user
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

export default managerActionsCallback;