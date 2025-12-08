import { InlineKeyboard } from "grammy";

export const actionsOnTheCall = (
    id: number,
    t: (key: string) => string
) => {
    const kb = new InlineKeyboard()
        .text(t("calls_action_open"), `${id}:c_call`).row();
    return kb;
}