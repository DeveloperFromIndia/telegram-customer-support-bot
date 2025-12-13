import { SUBSCRIPTION_STATUSES } from "@/database/models/Subscription";
import subscriptionService from "@/services/subscription.service";
import userService from "@/services/user.service";
import { Context, Keyboard } from "grammy";
import { tariffsView } from "./tarif";

export const profileActionsView = async (t: (key: string) => string, telegramId: number): Promise<[string, any]> => {
    const usr = await userService.find(telegramId);
    const kb = new Keyboard();
    let text = "";

    if (usr.isManager) {
        kb
            .text(t("calls")).row()
            .text(t("clients")).row()
            .text(t("payments")).row()
            .text(t("tarifs")).row()
            .resized();

        text = t("profile_actions_title");
        return [text, kb];
    }

    const sub = await subscriptionService.findUserSubscription(telegramId);
    if (!sub) {
        kb.text(t("show_tarif_list"));
        text = t("show_tarif_list_title");
    }

    switch (sub?.status) {
        case SUBSCRIPTION_STATUSES.active:
            kb.text(t("request_call"));
            text = t("profile_actions_title");
            break;
    }

    kb.resized();
    return [text, kb]
}