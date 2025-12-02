export class UserDto {
    id?: number;
    telegramId: number;
    name?: string | null;
    username?: string | null;
    phone?: string | null;
    blocked?: boolean;
    idInCRM?: number;
    isManager?: boolean;

    constructor(model: any) {
        this.id = model.id;
        this.telegramId = model.telegramId;
        this.name = model.name;
        this.username = model.username;
        this.phone = model.phone;
        this.blocked = model.blocked;
        this.idInCRM = model.idInCRM;
        this.isManager = model.isManager;
    }

    get() {
        const obj: Record<string, any> = {
            id: this.id,
            telegramId: this.telegramId,
            name: this.name,
            username: this.username,
            phone: this.phone,
            blocked: this.blocked,
            idInCRM: this.idInCRM,
            isManager: this.isManager,
        };

        Object.keys(obj).forEach((key: string) => {
            const value = obj[key];
            if (value === null || value === undefined) {
                delete obj[key];
            }
        });

        return obj;
    }
}
