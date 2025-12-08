import bot from "index";

type MessageData = {
    text?: string;
    photo?: string | { url: string; caption?: string };
    video?: string | { url: string; caption?: string };
    video_note?: string;
    voice?: string;
    document?: string | { url: string; caption?: string };
    audio?: string | { url: string; caption?: string };
    caption?: string;
    [key: string]: any;
};

export const sendMessage = async (chatId: number, data: MessageData, kb?: any) => {
    if (!data) return;

    switch (true) {
        case typeof data.text === "string":
            return await bot.api.sendMessage(chatId, data.text, {
                reply_markup: kb,
            });

        case typeof data.photo === "string" || typeof data.photo === "object":
            return await bot.api.sendPhoto(chatId, typeof data.photo === "string" ? data.photo : data.photo.url, {
                caption: (data.photo as any)?.caption || data.caption,
                reply_markup: kb,
            });

        case typeof data.video === "string" || typeof data.video === "object":
            return await bot.api.sendVideo(chatId, typeof data.video === "string" ? data.video : data.video.url, {
                caption: (data.video as any)?.caption || data.caption,
                reply_markup: kb,
            });

        case typeof data.video_note === "string":
            return await bot.api.sendVideoNote(chatId, data.video_note, {
                reply_markup: kb,
            });

        case typeof data.voice === "string":
            return await bot.api.sendVoice(chatId, data.voice, {
                caption: data.caption,
                reply_markup: kb,
            });

        case typeof data.document === "string" || typeof data.document === "object":
            return await bot.api.sendDocument(chatId, typeof data.document === "string" ? data.document : data.document.url, {
                caption: (data.document as any)?.caption || data.caption,
                reply_markup: kb,
            });

        case typeof data.audio === "string" || typeof data.audio === "object":
            return await bot.api.sendAudio(chatId, typeof data.audio === "string" ? data.audio : data.audio.url, {
                caption: (data.audio as any)?.caption || data.caption,
                reply_markup: kb,
            });

        case typeof data.sticker === "string":
            return await bot.api.sendSticker(chatId, data.sticker, {
                reply_markup: kb,
            });

        case typeof data.animation === "string":
            return await bot.api.sendAnimation(chatId, data.animation, {
                caption: data.caption,
                reply_markup: kb,
            });

        default:
            throw new Error("Unsupported message type");
    }
};

export const transferMessageToAnotherChat = async (telegramId: number, ctx: any) => {
    if (!ctx.message) return;

    let data: MessageData = {};

    switch (true) {
        case typeof ctx.message?.text === "string":
            data.text = ctx.message.text;
            break;

        case typeof ctx.message?.sticker === "object":
            data.sticker = ctx.message.sticker.file_id;
            break;

        case typeof ctx.message?.photo === "object":
            data.photo = ctx.message.photo[ctx.message.photo.length - 1].file_id; // берем наибольшую
            data.caption = ctx.message.caption;
            break;

        case typeof ctx.message?.video === "object":
            data.video = ctx.message.video.file_id;
            data.caption = ctx.message.caption;
            break;

        case typeof ctx.message?.video_note === "object":
            data.video_note = ctx.message.video_note.file_id;
            break;

        case typeof ctx.message?.voice === "object":
            data.voice = ctx.message.voice.file_id;
            break;

        case typeof ctx.message?.document === "object":
            data.document = ctx.message.document.file_id;
            data.caption = ctx.message.caption;
            break;

        case typeof ctx.message?.audio === "object":
            data.audio = ctx.message.audio.file_id;
            data.caption = ctx.message.caption;
            break;
        case typeof ctx.message?.sticker === "object":
            data.sticker = ctx.message.stricker;
            break;

        default:
            console.log("Unsupported message type");
            return;
    }

    return await sendMessage(telegramId, data);
};


