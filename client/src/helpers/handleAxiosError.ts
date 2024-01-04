import { AxiosError } from 'axios';

export const handleAxiosError = (error: unknown): string => {
    const axiosError = error as AxiosError;
    return axiosError.response && typeof axiosError.response.data === 'string'
        ? axiosError.response.data
        : 'Unknown error';
};
