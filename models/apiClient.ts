import axios, { Axios } from 'axios';

export default class ApiClient {
    client: Axios;
    constructor() {
        this.checkEnv();
        this.client = axios.create({
            baseURL: process.env.EXPO_PUBLIC_API_URL,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    public checkEnv() {
        if (process.env.EXPO_PUBLIC_API_URL == null) {
            throw new Error('No api url provided');
        }
    }

    async request (method: string, endpoint: string, data?: object) {
        return await this.client.request({
            url: endpoint,
            method,
            data
        });
    }
}