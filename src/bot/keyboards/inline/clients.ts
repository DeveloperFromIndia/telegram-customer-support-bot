import { InlineKeyboard } from "grammy";

export const actionsOnTheClient = (
    { telegramId, blocked }: { telegramId: number, blocked: boolean },
    t: (key: string) => string
) => {
    const kb = new InlineKeyboard();

    blocked ?
        kb.text(t("clients_action_unblock"), `${telegramId}:b_user`)
        :
        kb.text(t("clients_action_block"), `${telegramId}:b_user`)
    return kb;
}