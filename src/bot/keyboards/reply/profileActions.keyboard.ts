import userService from "@/services/user.service";
import { InlineKeyboard, Keyboard } from "grammy";

export const profileActionsKeyboard = async (t: (key: string) => string, telegramId: number) => {
    const usr = await userService.find(telegramId);
    
    if (usr.isManager)
        return new Keyboard()
            .text(t("clients")).row()
            .text(t("payments")).row()
            .text(t("tarifs")).row()
            .resized();

    return new InlineKeyboard()
        .text(t("requst_call"), "REQUEST_CALL");
}