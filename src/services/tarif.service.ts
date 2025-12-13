import TarifModel from "@/database/models/Tarifs";
import getPaginatedData, { type paginationDataType } from "@/utils/pagination";

class TarifService {
    /* true - status: 200 */
    async create(data: any) {
        const { price, name, periodMonths } = data;
        const tarif = await TarifModel.create({
            name,
            price,
            periodMonths,
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

    async getTarifs() {
        return await TarifModel.findAll({
            where: {
                isActive: true,
            },
            order: [["periodMonths", "ASC"]]
        });
    }
}

export default new TarifService;