import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/consts/tokens';

export const setToken = (accessToken: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
};

export const setRefreshToken = (refreshToken: string) => {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const getToken = () => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = () => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const removeToken = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
};

export const removeRefreshToken = () => {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
};
