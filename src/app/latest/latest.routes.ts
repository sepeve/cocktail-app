import { NavigationPath } from '@/models';

export const LATEST_ROUTES = [
    {
        path: NavigationPath.Latest,
        loadComponent: () => import(
            /** webpackChunkName: "latest" */
            "./latest.component"
        ).then(c => c.LatestComponent)
    }
];

