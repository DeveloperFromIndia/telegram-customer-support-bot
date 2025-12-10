import userService from "@/services/user.service";

interface UserCache {
    isManager: boolean;
    blocked: boolean;
    expiresAt: number;
}

const userCache = new Map<number, UserCache>();
const CACHE_TTL = 60_000; // 1 минута

async function userAccessCache(ctx: any, next: () => Promise<void>) {
    let telegramId = ctx.chat.id;
    let cache = userCache.get(telegramId);
    const now = Date.now();

    if (!cache || cache.expiresAt < now) {
        const user = await userService.find(telegramId);

        cache = {
            isManager: user?.isManager,
            blocked: user?.blocked,
            expiresAt: now + CACHE_TTL
        };
        userCache.set(telegramId, cache);
    }

    (ctx as any).isManager = cache.isManager || false;
    await next();
}

export default userAccessCache;