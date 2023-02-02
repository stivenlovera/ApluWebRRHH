
import { AsyncLocalStorage } from "async_hooks";
import AXIOS from "axios";
const asyncLocalStorage = {
    setItem: async function (key:any, value:any) {
        await null;
        return localStorage.setItem(key, value);
    },
    getItem: async function (key:any) {
        await null;
        return localStorage.getItem(key);
    }
};

export interface AxiosResponseProps {
    status: number;
    statusText: string;
}
export const AxiosResponse = (response: AxiosResponseProps) => {
    if (response.status == 200) {
        console.log(response)
    }
    else {
        return false;
    }
    return response.status;
}
//${}
export const AxiosRequest = async () => {
    AXIOS.interceptors.request.use(
        async (config) => {
            config.headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await asyncLocalStorage.getItem('token')}`
            };
            return config;
        }
    );
}
