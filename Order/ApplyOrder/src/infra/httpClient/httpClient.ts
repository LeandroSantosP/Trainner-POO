export interface httpClient {
    get(url: string, paramsKey?: string, params?: any): Promise<any>;
}
