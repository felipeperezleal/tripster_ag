import { generalRequest } from "../../utilities";
import { serverConfigurations } from "./server";

const authServerConfig = serverConfigurations.config5;

const authURL = `http://${authServerConfig.url}:${authServerConfig.port}/${authServerConfig.entryPoint}`;

export const isAuthenticated = async (token) =>{
    try {
        const headers = {
            authorization: token, 
          };
        const response = await generalRequest(`${authURL}/info`,'POST',headers);
        if(response.token){
            return true;
        }else{
            return false;
        }
        
    } catch (error) {
        console.error('Error al autenticar:', error);
        return false;
    }
};