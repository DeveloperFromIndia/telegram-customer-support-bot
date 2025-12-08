import callService from "@/services/call.service";
import type { paginationDataType } from "@/utils/pagination";
import paginatedData from "@/bot/keyboards/inline/pagination";
import userService from "@/services/user.service";

export const callView = (
    data: any,
    t: (key: string) => string
) => {
    const { client } = data;
    const createdAt = new Date(data.createdAt);
    const formatted = createdAt.toLocaleString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
    return `
    ${t("user_field_name")} ${client.name}
${t("user_field_phone")} ${client.phone}
${t("user_field_username")} @${client.username}
${t("user_field_createdAt")} ${formatted}
    `;
}

export const paginatedCalls = async (
    page: number,
) => {
    const params: paginationDataType = { page, count: 10, url: "p_call", filters: { status: "waiting" } }
    const data = await callService.getPage(params);

    const resultWithClients = await Promise.all(
        data.result.map(async (item: any) => {
            const client = await userService.find(item.clientId);
            return {
                ...item,
                client,
            };
        })
    );

    const format = (item: any) => {
        return `${item.id}: ${item.client.name} ${item.client.phone}`;
    };

    return paginatedData(page, format, { ...data, result: resultWithClients });
};