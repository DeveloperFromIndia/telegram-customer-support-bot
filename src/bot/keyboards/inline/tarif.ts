import tarifService from "@/services/tarif.service"
import { InlineKeyboard } from "grammy";

export const tariffKeyboard = async (t: (key: string) => string) => {
    const kb = new InlineKeyboard;
    const tarifs = await tarifService.getTarifs();
    if (!tarifs.length) return null;

    tarifs.map((t: any) => {
        kb.text(t("tarif_in_list", { price: t.price, periodMonths: t.periodMonths }), `${t.id}:b_tarif`);
    })

    return kb;
}