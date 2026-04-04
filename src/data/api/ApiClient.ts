/**
 * ApiClient simulating the network layer used in the Android application.
 * It configures standard headers and base URL.
 */

// @ts-ignore
import { apiFetch } from '../../api';
class ApiClient {
    private getHeaders(): HeadersInit {
        return {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${getToken()}` // Add auth equivalent to Android
            'X-App-Platform': 'Web',
        };
    }

    async get<T>(endpoint: string): Promise<T> {
        const response = await apiFetch(endpoint, {
            method: 'GET',
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        return response.json();
    }

    async post<T>(endpoint: string, data?: unknown): Promise<T> {
        const response = await apiFetch(endpoint, {
            method: 'POST',
            headers: this.getHeaders(),
            body: data ? JSON.stringify(data) : undefined,
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        // Some post requests might return empty bodies
        const text = await response.text();
        return text ? JSON.parse(text) : {} as T;
    }
}

export const apiClient = new ApiClient();
