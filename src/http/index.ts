import axios from "axios";

const $api = axios.create({
    withCredentials: true,
    baseURL: process.env.CRM_API,
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${process.env.CRM_TOKEN}`;
    return config;
});


export const customGet = (link: string) => {
    return $api.get(link);
}

export default $api;