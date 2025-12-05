import { type paginationDataResultType } from "@/utils/pagination";
import { InlineKeyboard } from "grammy";

const paginatedData = (page: number, title: any, data: paginationDataResultType) => {
    const kb = new InlineKeyboard();

    // Result
    for (const item of data.result) {
        kb.text(title(item), `${item.id}:${data.url}`).row();
    }

    // Navigation
    kb.row();
    data.links.prev ? kb.text('➡️', data.links.prev) : kb.text('⏺️', 'plug');
    data.links.next ? kb.text('⬅️', data.links.next) : kb.text('⏺️', 'plug');

    return kb;
}

export default paginatedData;