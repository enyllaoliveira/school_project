import axios from "axios";
import {  ConnectionAPIPost } from "../API/connection";

export const authRequest = async (url: string, body: any)=> {
    const result = (await axios.post(url, body)).data;
    if (!result) {
      throw new Error("Erro")
    }
    return result;
  };
