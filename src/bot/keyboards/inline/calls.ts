import { InlineKeyboard } from "grammy";

export const actionsOnTheCall = (
    telegramId: number,
    t: (key: string) => string
) => {
    const kb = new InlineKeyboard()
        .text(t("calls_action_open"), `${telegramId}:c_call`).row();
    return kb;
}