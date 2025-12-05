// import blockedCache from "@/utils/blockedCache";

// const blockedMiddleware = async (ctx: any, next: () => Promise<void>) => {
//     await blockedCache(ctx, async () => {
//         if (!(ctx as any).blocked) {
//             await next();
//         }
//     });
// };

// export default blockedMiddleware;