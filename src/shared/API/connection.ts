import axios from "axios";
import { Methods } from "../constants/methodsEnum";
import { Errors } from "../constants/errorsEnum";


export default class ConnectionAPI {
    static async Call(url:string, method:string, body?:Object) {  //fará as requisições
        switch (method) {
            case Methods.GET:
                return (
                    (await axios.get(url)).data
                )
            case Methods // continuar
        
            default:
                break;
        }
    }

    static async Connect(url:string, method:string, body?:Object) { //só vai tratar erro
        return ConnectionAPI.Call(url, method, body).catch((error) => {
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        throw new Error(Errors.ERROR_ACCESS_NOT_AUTHORIZED)
                
                    // seguir aqui a lista    
                    default:
                        break;
                }
            }
        })
    }
}

export const ConnectionAPIGet = async (url:string) => {
    ConnectionAPI.Connect(url, Methods.GET )
}