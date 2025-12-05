import { Bot } from "grammy";
import HandlersWrapper from "./handlers/wrapper";
import i18n, { type ConfigContext } from "i18n/config";

// Middleware
import localeMiddleware from "@/middleware/locale";
// import blockedMiddleware from "@/middleware/blocked";
// Commands
import startCommand from "./handlers/commands/start";
// Messages
import phoneRequest from "./handlers/message/phoneRequest";
import managerMessage from "./handlers/message/managerActions";
// Callback's
import plugCallback from "./handlers/callback/plug";
import managerActionsCallback from "./handlers/callback/managerActions";
import clientsMessage from "./handlers/message/clientsActions";
import transferMessage from "./handlers/message/call";
import getChatIdCommand from "./handlers/commands/getChatId";


const bot = process.env.BOT_TOKEN ? new Bot<ConfigContext>(process.env.BOT_TOKEN) : null;

const setupBot = () => {
    if (!bot)
        throw console.error("Token not found");

    bot.use(i18n.middleware());
    bot.use(localeMiddleware)

    // Commands
    HandlersWrapper([
        startCommand,
        getChatIdCommand
    ], bot);
    // Callbacks
    HandlersWrapper([
        plugCallback,
        managerActionsCallback,
    ], bot);
    // Messages
    HandlersWrapper([
        phoneRequest,
        managerMessage,
        clientsMessage, 
        transferMessage,
    ], bot);
    return bot;
}

export default setupBot;