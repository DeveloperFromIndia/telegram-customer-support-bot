import bot from "index";

export const transferMessageToAnotherChat = async (telegramId: number, ctx: any) => {

    switch (true) {
        case typeof ctx.message?.text === "string":
            const msg = await bot.api.sendMessage(telegramId, ctx.message.text);
            return msg;
        case typeof ctx.message?.voice === "object":
            console.log("voice message");
            break;

        case typeof ctx.message?.video_note === "object":
            console.log("video_note message");
            break;

        case typeof ctx.message?.document === "object":
            console.log("document message");
            break;

        case typeof ctx.message?.video === "object":
            console.log("video message");
            break;

        case typeof ctx.message?.audio === "object":
            console.log("audio message");
            break;
    }
}

export const sendMessage = async (chatId: number, txt: string) => {
    const msg = await bot.api.sendMessage(chatId, txt);
    return msg;
}