import { UserDto } from "@/dto/user.dto";
import userService from "@/services/user.service";
import { Bot } from "grammy";
import { type ConfigContext } from "i18n/config";

const phoneRequest = (bot: Bot<ConfigContext>) => {
    bot.on("message:contact", async (ctx) => {
        const { user_id, phone_number, first_name } = ctx.message.contact;
        if (!user_id)
            return await ctx.reply("Something went wrong");

        const user = await userService.find(user_id);
        if (user) {
            // http req to CRM
            const userData = new UserDto({
                telegramId: user_id,
                name: first_name,
                username: ctx.from.username,
                phone: phone_number,
                blocked: false,
                isInCRM: true
            });
            const data = await userService.update(userData);
            //

            return await ctx.reply(data);
        }
    });
};

export default phoneRequest;