import { Bot, session } from "grammy";
import { conversations, createConversation } from "@grammyjs/conversations";
import i18n, { type ConfigContext } from "i18n/config";
import HandlersWrapper from "./handlers/wrapper";

// Middleware
import localeMiddleware from "@/middleware/locale";
// import blockedMiddleware from "@/middleware/blocked";

// Commands
import startCommand from "./handlers/commands/start";
import getChatIdCommand from "./handlers/commands/getChatId";
// Conversation's
import { createTarifConversation } from "./handlers/scenes/tarif";
// Callback's
import plugCallback from "./handlers/callback/plug";
import callbackManagerTarifActions from "./handlers/callback/manager/tarif";
import callbackManagerCallActions from "./handlers/callback/manager/call";
import callbackManagerUserActions from "./handlers/callback/manager/user";
// Messages
import messageManagerCallActions from "./handlers/message/manager/call";
import messageManagerPaymentsActions from "./handlers/message/manager/payments";
import messageManagerTarifActions from "./handlers/message/manager/tarif";
import messageManagerUserActions from "./handlers/message/manager/user";
import phoneRequest from "./handlers/message/phoneRequest";
import clientsMessage from "./handlers/message/clientsActions";
import transferMessage from "./handlers/message/call";

const bot = process.env.BOT_TOKEN ? new Bot<ConfigContext>(process.env.BOT_TOKEN) : null;

const setupBot = () => {
    if (!bot)
        throw console.error("Token not found");

    bot.use(session({ initial: () => ({}) }));
    bot.use(i18n.middleware());
    bot.use(localeMiddleware);
    bot.use(conversations());

    bot.use(createConversation(createTarifConversation));

    HandlersWrapper([
        startCommand,
        getChatIdCommand
    ], bot);
    
    HandlersWrapper([
        // Manager
        callbackManagerTarifActions,
        callbackManagerCallActions,
        callbackManagerUserActions,
        // Other
        plugCallback,
    ], bot);

    HandlersWrapper([
        // Manager
        messageManagerCallActions,
        messageManagerPaymentsActions,
        messageManagerTarifActions,
        messageManagerUserActions,
        
        // Clients
        phoneRequest,
        clientsMessage,
        
        // Utils
        transferMessage,
    ], bot);

    return bot;
}

export default setupBot;