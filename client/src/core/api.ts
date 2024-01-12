import { getToken } from '@/helpers/tokenHelpers';
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://daily-planner-k6kz.onrender.com/api',
});

api.interceptors.request.use((config) => {
    const token = getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})   

export default api;
