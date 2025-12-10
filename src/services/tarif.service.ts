import TarifModel from "@/database/models/Tarifs";
import getPaginatedData, { type paginationDataType } from "@/utils/pagination";
import { Op } from "sequelize";

class TarifService {
    /* true - status: 200 */
    async create(data: any) {
        const { price, days } = data;
        const tarif = await TarifModel.create({
            price,
            days
        });

        return tarif?.toJSON() || null;
    }

    async find(id: number) {
        const tarif = await TarifModel.findByPk(id);
        return tarif?.toJSON() || null;
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