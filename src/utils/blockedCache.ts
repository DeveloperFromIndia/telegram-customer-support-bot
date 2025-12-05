import userService from "@/services/user.service";

interface UserCache {
    blocked: boolean;
    expiresAt: number;
}

const userCache = new Map<number, UserCache>();
const CACHE_TTL = 60_000; // 1 минута

async function blockedCache(ctx: any, next: () => Promise<void>) {
    let telegramId = ctx.message.from.id;
    let cache = userCache.get(telegramId);
    const now = Date.now();

    if (!cache || cache.expiresAt < now) {
        const user = await userService.find(telegramId);
        cache = {
            blocked: user.blocked,
            expiresAt: now + CACHE_TTL
        };
        userCache.set(telegramId, cache);
    }

    (ctx as any).blocked = cache.blocked;
    await next();
}

export default blockedCache;