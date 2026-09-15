import { NavigationPath } from '../../models';

export const HOME_ROUTES = [
    {
        path: NavigationPath.Main,
        loadComponent: () => import(/** webpackChunkName: "home" */ "./home.component").then((c) => c.HomeComponent)
    }
];
