import TarifModel from "@/database/models/Tarifs";
import getPaginatedData, { type paginationDataType } from "@/utils/pagination";
import { Op } from "sequelize";

class TarifService {
    /* true - status: 200 */
    async create(data: any) {
        
    }

    async find(id: number) {
        
    }

    async getPage({ page, count, order, filters, url }: paginationDataType) {
        return await getPaginatedData({
            model: TarifModel,
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

export default new TarifService;