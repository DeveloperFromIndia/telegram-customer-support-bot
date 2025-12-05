import CallModel from "@/database/models/Call";
import UserModel from "@/database/models/User";
import type { UserDto } from "@/dto/user.dto";
import getPaginatedData, { type paginationDataType } from "@/utils/pagination";
import { randomBytes } from "crypto";
import path from "path";
import { Op } from "sequelize";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function makeId(): string {
    const d = new Date();

    const date =
        d.getFullYear() + "-" +
        String(d.getMonth() + 1).padStart(2, "0") + "-" +
        String(d.getDate()).padStart(2, "0");

    const time =
        String(d.getHours()).padStart(2, "0") + "-" +
        String(d.getMinutes()).padStart(2, "0");

    const rand = randomBytes(2).toString("base64url").slice(0, 3);

    return `${date}-${rand}-${time}`;
}

class CallService {
    // 
    async create(managerId: number | null, clientId: number) {
        const chat = await CallModel.findOne({
            where: {
                managerId,
                clientId
            }
        });

        if (chat)
            return [chat, false];

        const fileName = `${makeId()}.txt`; // ← имя файла
        const filePath = path.resolve(__dirname, "..", "arhive", fileName);

        const call = await CallModel.create({
            clientId,
            managerId,
            status: "waiting",
            archiveFile: fileName
        });

        return [call, true]
    }

    async find(callId: number) {
        const call = await CallModel.findByPk(callId);
        return call?.toJSON();
    }

    async inCall(telegramId: number) {
        try {
            const inCall = await CallModel.findOne({
                where: {
                    [Op.or]: [
                        { clientId: telegramId },
                        { managerId: telegramId, status: "open" }
                    ],
                }
            });
            return inCall?.toJSON() || null;
        } catch (err) {
            console.error(err);
        }
    }

    async getPage({ page, count, order, filters, url }: paginationDataType) {
        return await getPaginatedData({
            model: CallModel,
            page,
            count,
            filters,
            order,
            url,
            include: []
        })
    }

    async update(data: any) {
        const { id, ...rest } = data;
        const res = await CallModel.update(rest, { where: { id } });
        return res;
    }
}

export default new CallService;