import callService from "@/services/call.service";
import { sendMessage } from "@/utils/messages";
import type { Bot } from "grammy";
import type { ConfigContext } from "i18n/config";


const transferMessage = (bot: Bot<ConfigContext>) => {
    bot.on("message", async (ctx) => {
        const telegramId = ctx.chat.id;
        const callData = await callService.inCall(telegramId);
        
        if (!telegramId || !callData)
            return;
        
        switch (telegramId) {
            // message to client
            case callData.clientId:
                const [status, code] = callData.status.split(":");
                switch (status) {
                    case "open":
                        const msg = await sendMessage(callData.managerId, ctx);
                        break;
                    case "rolledup":

                        break;
                }
                break;
            // message to manager
            case callData.managerId:
                const msg = await sendMessage(callData.clientId, ctx);
                break;
        }
    });
};

export default transferMessage;