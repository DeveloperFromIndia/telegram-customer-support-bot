import { profileActionsView } from "@/bot/view/profile";
import { createPereson, getPeople } from "@/http/API/clients";
import userService from "@/services/user.service";
import type { Bot } from "grammy";
import type { ConfigContext } from "i18n/config";

const GROUP_ID = Number(process.env.NOTIFICATION_GROUP_ID);

const messageClientAuth = (bot: Bot<ConfigContext>) => {
    bot.on("message:contact", async (ctx) => {
        const { user_id, phone_number, first_name } = ctx.message.contact;
        if (!user_id)
            return ctx.reply("Something went wrong");

        const user = await userService.find(user_id);
        const { data } = await getPeople({ options: { phones: phone_number } }).catch(error => {
            ctx.reply("Something went wrong");
            throw error;
        });

        if (user && data.count > 0) {
            const userInCRM = data.data[0];
            const managerStatus = userInCRM.tags.find((tag: any) => tag.name === "manager");

            const userData = {
                id: user_id,
                name: first_name,
                username: ctx.from.username,
                phone: phone_number,
                blocked: false,
                idInCRM: userInCRM.id,
                isManager: !!managerStatus,
            };

            await userService.update(userData);
        } else {
            const requestData = {
                first_name,
                phones: [{
                    title: "telegram-bot",
                    phone: phone_number,
                    notify: false,
                    has_viber: false,
                    has_whatsapp: false,
                }],
                notes: `telegram username: ${"https://t.me/" + ctx.message.from.username || "null"}`,
            }

            const response = await createPereson(requestData).catch(error => {
                throw error;
            });

            const userData = {
                id: user_id,
                name: first_name,
                username: ctx.from.username,
                phone: phone_number,
                blocked: false,
                idInCRM: response.data.id,
            };
            await userService.update(userData);
        }
        
        const [text, kb] = await profileActionsView(ctx.t, user_id);
        return await ctx.reply(text, {
            reply_markup: kb
        })
    });
}

export default messageClientAuth;
