import { generalRequest } from "../../utilities";
import { serverConfigurations } from "./server";

const authServerConfig = serverConfigurations.config5;

const authURL = `http://${authServerConfig.url}:${authServerConfig.port}/${authServerConfig.entryPoint}`;

export const isAuthenticated = async (token) =>{
    try {
        const response = await generalRequest(`${authURL}`,'GET');
        return response.isValid;
    } catch (error) {
        console.error('Error al autenticar:', error);
        return false;
    }
};