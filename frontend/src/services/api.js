import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
});

// Add a request interceptor to include the auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Add a response interceptor to unwrap standardized responses
api.interceptors.response.use(
    (response) => {
        // If the backend returns our standardized format { success: true, data: ... }
        // We unpack 'data' so the frontend components get the actual resource
        if (response.data && response.data.success === true && response.data.data !== undefined) {
            return { ...response, data: response.data.data };
        }
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
