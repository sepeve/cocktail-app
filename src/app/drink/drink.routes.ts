import { NavigationPath } from '../../models';

export const DRINK_ROUTES = [
    {
        path: NavigationPath.Drink,
        loadComponent: () => import(
            /** webpackChunkName: "drink list" */
            "./list/drink-list.component"
        ).then((c) => c.DrinkListComponent)
    },
    {
        path: `${NavigationPath.Drink}/${NavigationPath.Id}`,
        loadComponent: () => import(
            /** webpackChunkName: "drink-detail" */
            "./detail/drink-detail.component"
        ).then((c) => c.DrinkDetailComponent)
    },
    {
        path: `${NavigationPath.Drink}/${NavigationPath.Id}/${NavigationPath.BackPath}`,
        loadComponent: () => import(
            /** webpackChunkName: "drink-detail" */
            "./detail/drink-detail.component"
        ).then((c) => c.DrinkDetailComponent)
    }
];
