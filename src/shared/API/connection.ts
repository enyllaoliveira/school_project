import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { Methods } from "../constants/methodsEnum";
import { Errors } from "../constants/errorsEnum";
import Cookies from 'universal-cookie'

export default class ConnectionAPI {
    private static headers: AxiosRequestConfig = {}

    static setHeaders(headers: { [key: string]: string }): void {
        ConnectionAPI.headers = { ...ConnectionAPI.headers, ...headers };
    }

    static async Call<T>(url: string, method: string, body?: Object): Promise<T> {
        const cookies = new Cookies()
        const token = cookies.get('token')
        ConnectionAPI.setHeaders({
            Authorization: `Bearer ${token}`
    }) 
    const requestConfig: AxiosRequestConfig = {
            method,
            ...ConnectionAPI.headers,
            ...(body && {data: body})
        }
        const response: AxiosResponse<T> = await axios(url, requestConfig);
        return response.data;
    }

    static async Connect<T>(url: string, method: string, body?: Object): Promise<T> {
        try {
            return await ConnectionAPI.Call<T>(url, method, body);
        } catch (error: any) {
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        throw new Error(Errors.ERROR_ACCESS_NOT_AUTHORIZED);
                    case 403:
                        throw new Error(Errors.ERROR_CONNECTION);
                    default:
                        throw new Error(Errors.ERROR_NOT_FOUND);
                }
            }
            throw new Error(Errors.ERROR_CONNECTION);
        }
    }
}

export const ConnectionAPIGet = async (url: string): Promise<any> => {
    try {
        const response = await ConnectionAPI.Connect(url, Methods.GET);
        return response;
    } catch (error) {
        console.error("Erro na requisição GET:", error);
        throw error;
    }
}

export const ConnectionAPIPost = async <T>(url: string, body: Object): Promise<T> => {
    try {
    const response = await ConnectionAPI.Connect<T>(url, Methods.POST, body);
        return response;
    } catch (error) {
     console.error("Erro na requisição POST:", error);
     throw error; 
    }
 }