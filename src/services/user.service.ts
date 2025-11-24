import UserModel from "@/database/models/User";
import type { UserDto } from "@/dto/user.dto";

class UserService {
    /* true - status: 200 */
    async create(telegramId: number) {
        const [user, created] = await UserModel.findOrCreate({
            where: { telegramId },
            defaults: { telegramId }
        });

        const result = user.toJSON();
        return [result, created];
    }

    async find(telegramId: number) {
        const user = await UserModel.findOne({
            where: { telegramId },
        });

        return !user ? null : user.toJSON();
    }

    async update(data: UserDto) {
        const user = await UserModel.findOne({ where: { telegramId: data.telegramId } });
        if (!user) return null;

        const updateData: Partial<UserDto> = {
            name: data.name,
            username: data.username,
            phone: data.phone,
            blocked: data.blocked,
            isInCRM: data.isInCRM
        };

        await user.update(updateData);
        return user.toJSON();
    }
}

export default new UserService;