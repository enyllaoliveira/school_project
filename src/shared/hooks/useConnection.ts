import { ConnectionAPIGet, ConnectionAPIPost } from "../API/connection";

export const useConnection = () => {
    const postRequest = async (url: string, body: any)=> {
        const result = 
        await ConnectionAPIPost(url, body)
          .then((result) => {
            
            return result;
          })
          .catch((error: Error) => {
            return undefined
          });
          
        return result;
      };

     return(
        postRequest
     )
    }