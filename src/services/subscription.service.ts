import SubscriptionModel from "@/database/models/Subscription";
import getPaginatedData, { type paginationDataType } from "@/utils/pagination";


type SubscriptionType = {
    id: number,
    telegramId: number,
    status: string,
    tarifId: number,
    current_period_start: Date,
    current_period_end: Date,
}

class SubscriptionService {
    async create(data: SubscriptionType) {

    }

    async findUserSubscription(telegramId: number) {
        const sub = await SubscriptionModel.findOne({
            where: {
                telegramId
            }
        });
        
        return sub?.toJSON() || null;
    }

    async getPage({ page, count, order, filters, url }: paginationDataType) {
        return await getPaginatedData({
            model: SubscriptionModel,
            page,
            count,
            filters,
            order,
            url,
        })
    }

    async update(data: any) {
    }
}

export default new SubscriptionService;