import { I18n, type I18nFlavor } from "@grammyjs/i18n";
import { Context } from "grammy";
import path from "path";

export const DEFAULT_LOCALE = "en";
export type ConfigContext = Context & I18nFlavor;

const i18n = new I18n<ConfigContext>({
    defaultLocale: DEFAULT_LOCALE,
    directory: path.resolve(__dirname, './locales'),
    useSession: true
});

export default i18n;