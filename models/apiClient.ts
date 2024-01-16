import axios, { Axios } from 'axios';
import Constants from 'expo-constants';
export default class ApiClient {
    client: Axios;

    constructor() {
        this.client = axios.create({
            baseURL: this.getBaseUrl(),
            headers: {
                'Content-Type': 'application/json'
            }
        });

    }

    private publicApiUrlExists() {
        if (process.env.EXPO_PUBLIC_API_URL == undefined) {
            return false;
        }

        return true;
    }

    private getBaseUrl(): string {
        if (this.publicApiUrlExists()) {
            return process.env.EXPO_PUBLIC_API_URL as string;
        }
        
        const uri = Constants.expoConfig?.hostUri;

        if (uri == undefined) {
            throw new Error('Could not get address of development host.');
        }

        if (process.env.EXPO_PUBLIC_LOCAL_API_PORT == undefined) {
            throw new Error('Could not get port of development host.');
        }

        const localAddress = (uri as string).replace(new RegExp(/:\d+/), ':' + process.env.EXPO_PUBLIC_LOCAL_API_PORT);
        const protocol = process.env.EXPO_PUBLIC_LOCAL_HTTPS == 'true' ? 'https' : 'http';
    
        return `${protocol}://${localAddress}`;
    }

    async request (method: string, endpoint: string, data?: object | string) {
        return await this.client.request({
            url: endpoint,
            method,
            data
        });
    }
}