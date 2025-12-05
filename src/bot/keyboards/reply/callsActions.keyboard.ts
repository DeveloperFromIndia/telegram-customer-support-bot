import { Keyboard } from "grammy";

export const actionsInTheCall = (
    t: (key: string) => string
) => {
    const kb = new Keyboard()
        .text(t("calls_action_finish"))
        .text(t("calls_action_rollup"))
        .resized();
    return kb;
}