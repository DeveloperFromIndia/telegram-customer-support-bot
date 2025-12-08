import CallModel from "@/database/models/Call";
import UserModel from "@/database/models/User";
import getPaginatedData, { type paginationDataType } from "@/utils/pagination";
import path from "path";
import { Op } from "sequelize";
import { fileURLToPath } from "url";
import userService from "./user.service";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


class CallService {
    // 
    async create(managerId: number | null, clientId: number): Promise<[object, boolean]> {
        let chat = await CallModel.findOne({
            where: {
                managerId,
                clientId,
            }
        });

        if (chat)
            return [chat.toJSON(), false];

        chat = await CallModel.create({
            clientId,
            managerId,
            status: "waiting",
        });

        return [chat.toJSON(), true]
    }

    async find(callId: number) {
        
        const call = await CallModel.findOne({
            where: {
                id: callId,
            }
        });
        console.log("call:", call, callId)
        return call?.toJSON();
    }

    async inCall(telegrmaId: number) {
        try {
            const inCall = await CallModel.findOne({
                where: {
                    [Op.or]: [
                        { clientId: telegrmaId },
                        { managerId: telegrmaId, status: "open" }
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
        })
    }

    async update(data: any) {
        const { id, ...rest } = data;
        const res = await CallModel.update(rest, { where: { id } });
        return res;
    }
}

export default new CallService;