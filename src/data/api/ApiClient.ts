/**
 * ApiClient simulating the network layer used in the Android application.
 * It configures standard headers and base URL.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com/v1';

class ApiClient {
    private getHeaders(): HeadersInit {
        return {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${getToken()}` // Add auth equivalent to Android
            'X-App-Platform': 'Web',
        };
    }

    async get<T>(endpoint: string): Promise<T> {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        return response.json();
    }

    async post<T>(endpoint: string, data?: unknown): Promise<T> {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
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
