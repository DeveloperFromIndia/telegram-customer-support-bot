export class UserDto {
    id: number;
    telegramId: number;
    name: string | null;
    username: string | null;
    phone: string | null;
    blocked: boolean;
    isInCRM: boolean;

    constructor(model: any) {
        this.id = model.id;
        this.telegramId = model.telegramId;
        this.name = model.name;
        this.username = model.username;
        this.phone = model.phone;
        this.blocked = model.blocked;
        this.isInCRM = model.isInCRM;
    }
}