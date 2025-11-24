import { Keyboard } from "grammy";

export const phoneRequestKeyboard = (t: (key: string) => string) =>
    new Keyboard(
        [
            [
                { text: t("request_contact"), request_contact: true }
            ]
        ]
    )
        .resized()
        .oneTime()