import userAccessCache from "@/utils/userAccessCache";

const accessMiddleware = async (ctx: any, next: () => Promise<void>) => {
    await userAccessCache(ctx, async () => {
        if ((ctx as any).isManager) {
            await next();
        }
    });
};

export default accessMiddleware;