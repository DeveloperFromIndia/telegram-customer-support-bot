import { DEFAULT_LOCALE, type ConfigContext } from "i18n/config";

const localeWhitelist = ["en", "ru", "ua"];

const localeMiddleware = async (ctx: ConfigContext, next: () => Promise<void>) => {
    const userLocale = ctx.from?.language_code ?? DEFAULT_LOCALE;
    
    if (localeWhitelist.includes(userLocale)) {
        ctx.i18n.useLocale(userLocale);
    } else {
        ctx.i18n.useLocale(DEFAULT_LOCALE);
    }
    return next();
};

export default localeMiddleware;
