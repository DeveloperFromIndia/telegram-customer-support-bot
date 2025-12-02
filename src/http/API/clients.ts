import $api from "../index";

export const getPeople = async (data: any) => {
    const { options } = data;
    return $api.get(`/contacts/people`, {
        params: options,
    });
}

export const getPeresonById = async (id: number) => {
    return $api.get(`/contacts/people/${id}`);
}

export const createPereson = async (data: any) => {
    return $api.post(`/contacts/people`, data);
}