import tarifService from "@/services/tarif.service";
import type { Conversation } from "@grammyjs/conversations";
import { InlineKeyboard } from "grammy";
import i18n, { DEFAULT_LOCALE } from "i18n/config";

export async function createTarifConversation(conversation: Conversation, ctx: any) {
    const lang = ctx.update.callback_query.from.language_code || DEFAULT_LOCALE;
    const t = (key: string) => i18n.t(lang, key);

    const cancelKeyboard = new InlineKeyboard()
        .text("❌ Отменить", "cancel_tarif_creation");

    await ctx.reply("Введите цену тарифа:", {
        reply_markup: cancelKeyboard
    });

    const priceCtx = await conversation.wait();

    if (priceCtx.message?.text === "/start") {
        await ctx.reply("❌ Создание тарифа отменено");
        return;
    }

    if (priceCtx.callbackQuery?.data === "cancel_tarif_creation") {
        await priceCtx.answerCallbackQuery();
        await priceCtx.editMessageText("❌ Создание тарифа отменено");
        return;
    }

    const price = Number(priceCtx.message?.text);
    if (isNaN(price) || price <= 0) {
        await ctx.reply("❌ Введите *валидную* цену!", { parse_mode: "Markdown" });
        return;
    }

    await ctx.reply("Введите количество дней:", {
        reply_markup: cancelKeyboard
    });

    const daysCtx = await conversation.wait();

    if (daysCtx.message?.text === "/start") {
        await ctx.reply("❌ Создание тарифа отменено");
        return;
    }

    if (daysCtx.callbackQuery?.data === "cancel_tarif_creation") {
        await daysCtx.answerCallbackQuery();
        await daysCtx.editMessageText("❌ Создание тарифа отменено");
        return;
    }

    const days = parseInt(daysCtx.message?.text || "0");
    if (isNaN(days) || days <= 0) {
        await ctx.reply("❌ Дней должно быть > 0!");
        return;
    }

    if (price && days) {
        const tarif = await tarifService.create({ price, days });
        if (tarif)
            return await ctx.reply(
                `✅ Тариф создан:\n\n💰 Цена: ${price}грн.\n📅 Дней: ${days}`
            );
    }
}