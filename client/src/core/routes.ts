import { FC } from 'react';

import { HomePage } from '@/pages/HomePage';
import { Loginpage } from '@/pages/LoginPage';
import { ROUTE_PATHS } from '@/consts/routePaths';

interface RouteItem {
    path: string;
    Element: FC;
    private?: boolean;
}

export const routes: RouteItem[] = [
    {
        path: ROUTE_PATHS.HOME,
        Element: HomePage,
        private: true,
    },
    {
        path: ROUTE_PATHS.SIGN_IN,
        Element: Loginpage,
    },
];