import { NavigationPath } from '../../models';

export const DRINK_ROUTES = [
    {
        path: NavigationPath.Drink,
        loadComponent: () => import(/** webpackChunkName: "drinks" */ "./list/drink-list.component").then((c) => c.DrinkListComponent)
    },
    {
        path: `${NavigationPath.Drink}/${NavigationPath.Id}`,
        loadComponent: () => import(/** webpackChunkName: "drinks" */ "./detail/drink-detail.component").then((c) => c.DrinkDetailComponent)
    }
];
