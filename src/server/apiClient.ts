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

    public static formatErrorMessage(message: string, delimiter: string): string {
        const onePastDelimiterIndex = message.indexOf(delimiter) + 1;

        return message.slice(onePastDelimiterIndex);
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

        if (!this.isHostPortEnvDefined()) throw new Error('Could not get port of development host.');
    
        return this.getHostAddressAndPort();
    }

    private getHostAddressAndPort() {
        const hostUri = Constants.expoConfig?.hostUri;

        if (hostUri == undefined) {
            throw new Error('Could not get address of development host.');
        }
        
        const localAddress = (hostUri as string).replace(new RegExp(/:\d+/), ':' + process.env.EXPO_PUBLIC_LOCAL_API_PORT);
        const protocol = process.env.EXPO_PUBLIC_LOCAL_HTTPS == 'true' ? 'https' : 'http';

        return `${protocol}://${localAddress}`;
    }

    private isHostPortEnvDefined() {
        if (process.env.EXPO_PUBLIC_LOCAL_API_PORT == undefined) return false;

        return true;
    }

    async request (method: string, endpoint: string, data?: object | string) {
        const res = await this.client.request({
            url: endpoint,
            method,
            data
        });

        return res;
    }
}