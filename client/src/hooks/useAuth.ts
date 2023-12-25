import { getToken } from "@/helpers/tokenHelpers";

export const useAuth = () => {
    const token = getToken();

    const isAuth = !!token;

    return { isAuth };
};
