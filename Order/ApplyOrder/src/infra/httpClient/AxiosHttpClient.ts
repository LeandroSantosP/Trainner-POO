import axios from "axios";
import { httpClient } from "./httpClient";

export class AxiosHttpClient implements httpClient {
    private baseUrl: string;
    constructor(baseUrl: string = "http://localhost:3001") {
        this.baseUrl = baseUrl;
    }
    async get(url: string, paramsKey?: string, paramsData?: any): Promise<any> {
        const response = await axios.get(`${this.baseUrl}${url}`, {
            params: {
                [`${paramsKey}`]: JSON.stringify(paramsData),
            },
        });
        return response.data;
    }
}
