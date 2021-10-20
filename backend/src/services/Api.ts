/**
 * Utilização de interceptors na configuração do Axios
 */
import axios from "axios";

const ApiGithub = axios.create(); 
  
ApiGithub.interceptors.request.use(config => {
    config.params = {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        ...config.params,
    };

    config.headers = {
        "Accept": "application/json",
        ...config.headers
    };

    return config;
});

export { ApiGithub };