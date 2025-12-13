import { tariffsView } from "@/bot/view/tarif";
import tarifService from "@/services/tarif.service";
import { hears } from "@grammyjs/i18n";
import type { Bot } from "grammy";
import type { ConfigContext } from "i18n/config";


const messageClientSubscription = (bot: Bot<ConfigContext>) => {
    bot.filter(hears("show_tarif_list"), async (ctx: ConfigContext) => {
        const [text, kb] = await tariffsView(ctx.t);
        console.log(kb)
        return ctx.reply(text, {
            reply_markup: kb,
        })
    });
}

export default messageClientSubscription;
