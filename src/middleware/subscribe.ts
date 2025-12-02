
// const requireActiveSubscription = async (ctx, next) => {
//     const sub = ctx.state.subscription;

//     if (
//         !sub ||
//         sub.status !== "active" ||
//         new Date(sub.current_period_end) < new Date()
//     ) {
//         await ctx.reply(
//             "❌ Эта функция доступна только по активной подписке."
//         );
//         return;
//     }

//     await next(); 
// };
