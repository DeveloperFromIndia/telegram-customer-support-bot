import tarifService from "@/services/tarif.service";
import type { Conversation } from "@grammyjs/conversations";
import { InlineKeyboard } from "grammy";
import i18n, { DEFAULT_LOCALE } from "i18n/config";

export async function createTarifConversation(conversation: Conversation, ctx: any) {
    const lang = ctx.update.callback_query?.from.language_code || DEFAULT_LOCALE;
    const t = (key: string) => i18n.t(lang, key);

    const cancelKeyboard = new InlineKeyboard().text(t("cancel"), "cancel_tarif_creation");

    await ctx.reply(t("tarif_input_1"), { reply_markup: cancelKeyboard });
    const nameCtx = await conversation.wait();

    if (nameCtx.message?.text === "/start" || nameCtx.callbackQuery?.data === "cancel_tarif_creation") {
        if (nameCtx.callbackQuery) await nameCtx.answerCallbackQuery();
        await ctx.reply(t("tarif_valid"));
        return;
    }

    const name = nameCtx.message?.text || "nameless";

    await ctx.reply(t("tarif_input_2"), { reply_markup: cancelKeyboard });
    const priceCtx = await conversation.wait();

    if (priceCtx.message?.text === "/start" || priceCtx.callbackQuery?.data === "cancel_tarif_creation") {
        if (priceCtx.callbackQuery) await priceCtx.answerCallbackQuery();
        await ctx.reply(t("tarif_valid"));
        return;
    }

    const price = Number(priceCtx.message?.text);
    if (isNaN(price) || price <= 0) {
        await ctx.reply(t("tarif_valid"), { parse_mode: "Markdown" });
        return;
    }

    await ctx.reply(t("tarif_input_3"), { reply_markup: cancelKeyboard });
    const periodCtx = await conversation.wait();

    if (periodCtx.message?.text === "/start" || periodCtx.callbackQuery?.data === "cancel_tarif_creation") {
        if (periodCtx.callbackQuery) await periodCtx.answerCallbackQuery();
        await ctx.reply(t("tarif_valid"));
        return;
    }

    const periodMonths = parseInt(periodCtx.message?.text || "0");
    if (isNaN(periodMonths) || periodMonths <= 0) {
        await ctx.reply(t("tarif_valid"));
        return;
    }

    const tarif = await tarifService.create({ name, price, periodMonths });
}
