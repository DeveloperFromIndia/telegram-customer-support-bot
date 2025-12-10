import { type paginationDataResultType } from "@/utils/pagination";
import { InlineKeyboard } from "grammy";

const paginatedData = (page: number, title: any, data: paginationDataResultType, additionalButtons: any[] = []) => {
    const kb = new InlineKeyboard();
    additionalButtons && additionalButtons.forEach((button: any) => {
        kb.text(button.text, button.callback_data);
        kb.row();
    })
    // Result
    for (const item of data.result) {
        const callbackData = `${item.id}:${data.url}`;
        kb.text(title(item), callbackData).row();
    }

    // Navigation
    kb.row();
    data.links.prev ? kb.text('⬅️', data.links.prev) : kb.text('⏺️', 'plug');
    data.links.next ? kb.text('➡️', data.links.next) : kb.text('⏺️', 'plug');
    kb.row();
    return kb;
}

export default paginatedData;