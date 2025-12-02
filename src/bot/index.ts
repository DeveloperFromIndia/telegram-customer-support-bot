import { Bot } from "grammy";
import HandlersWrapper from "./handlers/wrapper";

// Commands
import startCommand from "./handlers/commands/start";
import i18n, { type ConfigContext } from "i18n/config";
import localeMiddleware from "@/middleware/locale";
import phoneRequest from "./handlers/message/phoneRequest";
import plugCallback from "./handlers/callback/plug";
import clientsMessage from "./handlers/message/clients";

const bot = process.env.BOT_TOKEN ? new Bot<ConfigContext>(process.env.BOT_TOKEN) : null;

const setupBot = () => {
    if (!bot)
        throw console.error("Token not found");

    bot.use(i18n.middleware());
    bot.use(localeMiddleware)

    // Commands
    HandlersWrapper([
        startCommand
    ], bot);
    // Messages
    HandlersWrapper([
        phoneRequest,
        clientsMessage,
    ], bot);
    // Callbacks
    HandlersWrapper([
        plugCallback
    ], bot);

    return bot;
}
export default setupBot;