export const setToken = (accessToken: string) => {
    localStorage.setItem('token', accessToken);
};

export const setRefreshToken = (refreshToken: string) => {
    localStorage.setItem('refreshToken', refreshToken);
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
};

export const removeToken = () => {
    localStorage.removeItem('token');
};

export const removeRefreshToken = () => {
    localStorage.removeItem('refreshToken');
};