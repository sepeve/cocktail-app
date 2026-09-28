import { NavigationPath } from '@/models';

export const MOCKTAIL_ROUTES = [
    {
        path: NavigationPath.Mocktail,
        loadComponent: () => import(
            /** webpackChunkName: "mocktails" */
            "./mocktail.component"
        ).then((c) => c.MockatailComponent)
    },
];
