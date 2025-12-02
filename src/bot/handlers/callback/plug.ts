import type { Bot } from "grammy"
import type { ConfigContext } from "i18n/config"

const plugCallback = (bot: Bot<ConfigContext>) => {
    bot.callbackQuery("plug", async (ctx) => {
        try {
            ctx.answerCallbackQuery();
        } catch (error) {

        }
    });
}

export default plugCallback;