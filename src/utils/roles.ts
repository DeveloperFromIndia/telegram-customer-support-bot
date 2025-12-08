import { getPeople } from "@/http/API/clients";
import userService from "@/services/user.service"

const updateRoles = async (
    user_id: number,
): Promise<void> => {
    const user = await userService.find(user_id);
    if (user.phone) {
        const { data } = await getPeople({ options: { phones: user.phone } }).catch(error => {
            return error;
        });

        if (user && data.count > 0) {
            const userInCRM = data.data[0];
            const managerStatus = userInCRM.tags.find((tag: any) => tag.name === "manager");

            const userData = {
                id: user_id,
                blocked: false,
                idInCRM: userInCRM.id,
                isManager: !!managerStatus,
            };

            await userService.update(userData);
        }
    }
}

export default updateRoles;