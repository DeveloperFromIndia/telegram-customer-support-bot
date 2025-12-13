// import { SUBSCRIPTION_STATUSES } from "@/database/models/Subscription";
// import subscriptionService from "@/services/subscription.service";
// import userService from "@/services/user.service";
// import { Context, Keyboard } from "grammy";

// export const profileActionsView = async (t: (key: string) => string, telegramId: number) => {
//     const usr = await userService.find(telegramId);
//     const kb = new Keyboard();
//     let text = "";

//     if (usr.isManager) {
//         kb
//             .text(t("calls")).row()
//             .text(t("clients")).row()
//             .text(t("payments")).row()
//             .text(t("tarifs")).row()
//             .resized();

//         text = t("profile_actions_title");
//         return [text, kb];
//     }

//     const sub = await subscriptionService.findUserSubscription(telegramId);
//     if (!sub) 
//         return ["нету подписки", kb.text("subscribe")]
    
//     switch (sub.status) {
//         case SUBSCRIPTION_STATUSES.active:
//             kb.text(t("request_call"));
//             return 
//     }


//     kb.resized();
//     return kb;
// }