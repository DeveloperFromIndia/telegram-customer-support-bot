import { createFondyPayment } from "@/http/API/payment";
import tarifService from "@/services/tarif.service";
import type { Bot } from "grammy";
import type { ConfigContext } from "i18n/config";


const callbackClientSubscription = (bot: Bot<ConfigContext>) => {
    bot.callbackQuery(/^(\d+):b_tarif$/, async (ctx) => {
        const telegramId = Number(ctx.chat?.id);
        const messageId = Number(ctx.update.callback_query.message?.message_id);

        try {
            const id = Number(ctx.match[1]);
            const tarif = await tarifService.find(id);

            // fondy
            const order_id = `${ctx.from.id}_${Date.now()}`;
            const fondy = await createFondyPayment({
                amount: tarif.price,
                order_id
            })
            console.log(fondy);

            await ctx.editMessageText(
                `Вы выбрали тариф: ${tarif.days} дней — ${tarif.price} UAH.`,
                {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: "Перейти к оплате 💳",
                                    url: fondy.checkout_url
                                }
                            ]
                        ]
                    }
                }
            );
            
            await ctx.answerCallbackQuery();
        } catch (error) {
            await ctx.answerCallbackQuery();
        }
    });
}

export default callbackClientSubscription;