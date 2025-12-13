import tarifService from "@/services/tarif.service"
import { InlineKeyboard } from "grammy";

export const tariffsView = async (t: (key: string) => string): Promise<[string, any]> => {
    const kb = new InlineKeyboard;
    const tarifs = await tarifService.getTarifs();
    
    if (!tarifs.length) return [t("tarifs_not_exists"), null];

    tarifs.map((t: any) => {
        kb.text(t("tarif_in_list", { price: t.price, periodMonths: t.periodMonths }), `${t.id}:b_tarif`);
    })

    return [t("tarif_list_title"), kb];
}