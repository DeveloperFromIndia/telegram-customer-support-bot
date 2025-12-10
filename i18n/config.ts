import type { ConversationFlavor } from "@grammyjs/conversations";
import { I18n, type I18nFlavor } from "@grammyjs/i18n";
import type { SessionFlavor } from "grammy";
import { Context } from "grammy";
import path from "path";

export const DEFAULT_LOCALE = "en";

export type ConfigContext =
    Context &
    SessionFlavor<Record<string, any>> &
    I18nFlavor &
    ConversationFlavor<Context>;

const i18n = new I18n<ConfigContext>({
    defaultLocale: DEFAULT_LOCALE,
    directory: path.resolve(__dirname, "./locales"),
    useSession: true,
});

export default i18n;
