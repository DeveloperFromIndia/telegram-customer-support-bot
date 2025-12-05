import UserModel from "@/database/models/User";
import type { UserDto } from "@/dto/user.dto";
import getPaginatedData, { type paginationDataType } from "@/utils/pagination";
import { Op } from "sequelize";

class UserService {
    /* true - status: 200 */
    async create(data: any) {
        const { telegramId } = data;
        const [user, created] = await UserModel.findOrCreate({
            where: { telegramId },
            defaults: data,
        });

        const result = user.toJSON();
        return [result, created];
    }

    async find(id: number) {
        const user = await UserModel.findOne({
            where: {
                [Op.or]: [
                    { telegramId: id },
                    { id: id }
                ],
            }
        });

        return !user ? null : user.toJSON();
    }

    async getPage({ page, count, order, filters, url }: paginationDataType) {
        return await getPaginatedData({
            model: UserModel,
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
        const user = await UserModel.findOne({
            where: {
                [Op.or]: [
                    { telegramId: id },
                    { id: id }
                ],
            }
        });
        (await user?.update(rest));
        return user;
    }
}

export default new UserService;