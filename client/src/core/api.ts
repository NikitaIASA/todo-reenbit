import axios from 'axios';

import { getToken, removeToken, setToken, getRefreshToken, removeRefreshToken, setRefreshToken } from '@/helpers/tokenHelpers';
import { store } from '@/redux/store';
import { logoutSuccess } from '@/redux/actions/authActions';
import { ROUTE_PATHS } from '@/consts/routePaths';
import { resetTodoState } from '@/redux/actions/todoActions';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
});

async function refreshAccessToken() {
    try {
        const refreshToken = getRefreshToken();
        const { data } = await api.post('users/refresh', { refreshToken });
        const { newAccessToken, newRefreshToken } = data;
        setToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        return newAccessToken;
    } catch (error) {
        console.error("Failed to refresh token:", error);
        removeToken();
        removeRefreshToken();
        window.location.href = ROUTE_PATHS.SIGN_IN;
    }
}

api.interceptors.request.use((config) => {
    const token = getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newAccessToken = await refreshAccessToken();
                if (newAccessToken) {
                    originalRequest.headers['Authorization'] = `Bearer + ${newAccessToken}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                store.dispatch(logoutSuccess());
                store.dispatch(resetTodoState());
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
