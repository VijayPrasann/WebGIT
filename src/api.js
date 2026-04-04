export const API_BASE_URL = '"http://180.235.121.253:8143/api";';

/**
 * A wrapper around the native fetch API to automatically prepend the base URL.
 * 
 * @param {string} endpoint - The API endpoint to fetch, starting with a slash (e.g., '/upload-sample')
 * @param {RequestInit} [options={}] - Additional options for the fetch request
 * @returns {Promise<Response>} 
 */
export const apiFetch = async (endpoint, options = {}) => {
    return fetch(`${API_BASE_URL}${endpoint}`, options);
};

// --- Helper Functions (Optional) ---

export const get = (endpoint) => apiFetch(endpoint, { method: 'GET' });

export const post = (endpoint, body) => apiFetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
});

export const put = (endpoint, body) => apiFetch(endpoint, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
});

export const del = (endpoint) => apiFetch(endpoint, { method: 'DELETE' });
