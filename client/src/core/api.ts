import axios from 'axios';

import { getToken, removeToken } from '@/helpers/tokenHelpers';
import { store } from '@/redux/store';
import { logoutSuccess } from '@/redux/actions/authActions';
import { ROUTE_PATHS } from '@/consts/routePaths';

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

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            removeToken();
            store.dispatch(logoutSuccess());
            window.location.href = ROUTE_PATHS.SIGN_IN;
        }
        return Promise.reject(error);
    }
);

export default api;
