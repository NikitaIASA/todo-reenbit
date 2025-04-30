import axios, { AxiosInstance } from 'axios';
import {
    getToken,
    setToken,
    getRefreshToken,
    setRefreshToken,
    removeToken,
    removeRefreshToken,
} from '@/helpers/tokenHelpers';
import { ROUTE_PATHS } from '@/consts/routePaths';

let onUnauthorized: (() => void) | null = null;

export const setUnauthorizedHandler = (handler: () => void) => {
    onUnauthorized = handler;
};

export const getAxios = (): AxiosInstance => {
    const instance = axios.create();

    instance.interceptors.request.use(
        (config) => {
            const token = getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    const refreshAccessToken = async (): Promise<string | null> => {
        try {
            const refreshToken = getRefreshToken();
            const { data } = await instance.post('users/refresh', { refreshToken });
            const { newAccessToken, newRefreshToken } = data;
            setToken(newAccessToken);
            setRefreshToken(newRefreshToken);
            return newAccessToken;
        } catch (error) {
            console.error('Failed to refresh token:', error);
            removeToken();
            removeRefreshToken();
            window.location.href = ROUTE_PATHS.SIGN_IN;
            return null;
        }
    };

    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            if (
                error.response &&
                error.response.status === 401 &&
                !originalRequest._retry
            ) {
                originalRequest._retry = true;
                const newAccessToken = await refreshAccessToken();
                if (newAccessToken) {
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return instance(originalRequest);
                } else {
                    if (onUnauthorized) {
                        onUnauthorized();
                    }
                    return Promise.reject(error);
                }
            }
            return Promise.reject(error);
        }
    );

    return instance;
};
