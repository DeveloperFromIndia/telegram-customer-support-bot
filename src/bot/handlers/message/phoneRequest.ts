import { Bot } from "grammy";
import { type ConfigContext } from "i18n/config";
import { UserDto } from "@/dto/user.dto";
import { createPereson, getPeople } from "@/http/API/clients";
import userService from "@/services/user.service";
import { profileActionsKeyboard } from "@/bot/keyboards/reply/profileActions.keyboard";

const phoneRequest = (bot: Bot<ConfigContext>) => {
    bot.on("message:contact", async (ctx) => {
        const { user_id, phone_number, first_name } = ctx.message.contact;
        if (!user_id)
            return ctx.reply("Something went wrong");

        const user = await userService.find(user_id);
        const { data } = await getPeople({ options: { phones: phone_number } }).catch(error => {
            console.error(error);
            ctx.reply("Something went wrong");
            throw error;
        });

        if (user && data.count > 0) {
            const userInCRM = data.data[0];
            const managerStatus = userInCRM.tags.find((tag: any) => tag.name === "manager");

            const userData = new UserDto({
                telegramId: user_id,
                name: first_name,
                username: ctx.from.username,
                phone: phone_number,
                blocked: false,
                idInCRM: userInCRM.id,
                isManager: !!managerStatus,
            });

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

            await userService.create({
                telegramId: user_id,
                phone: phone_number,
                inInCRM: response.data.id || -1
            })
        }

        await ctx.reply(ctx.t("finished_comparing_contact"), {
            reply_markup: {
                remove_keyboard: true
            },
        });

        return await ctx.reply(ctx.t("profile_actions_title"), {
            reply_markup: await profileActionsKeyboard(ctx.t, user_id) // user_id === telegram_id
        });
    });
};

export default phoneRequest;