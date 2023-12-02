import axios from "axios";
import { Methods } from "../constants/methodsEnum";
import { Errors } from "../constants/errorsEnum";


export default class ConnectionAPI {
    static async Call<T>(url:string, method:string, body?:Object): Promise<T> {  //fará as requisições
        switch (method) {
            case Methods.GET:
                return (
                    (await axios.get(url)).data
                )
                  
            default:
                return (await axios.post(url)).data
            }
    }

    static async Connect<T>(url:string, method:string, body?:Object): Promise<T> { //só vai tratar erro
        return ConnectionAPI.Call<T>(url, method, body).catch((error) => {
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        throw new Error(Errors.ERROR_ACCESS_NOT_AUTHORIZED)
                
                    case 403:
                        throw new Error(Errors.ERROR_CONNECTION)

                    default:
                        throw new Error(Errors.ERROR_NOT_FOUND)
                } 
            } 
            throw new Error(Errors.ERROR_CONNECTION)

        })
    }
}

export const ConnectionAPIGet = async (url:string) => {
    ConnectionAPI.Connect(url, Methods.GET )
}

export const ConnectionAPIPost = async <T>(url:string, body: Object): Promise<T> => {
    return  ConnectionAPI.Connect<T>(url, Methods.POST, body )
}