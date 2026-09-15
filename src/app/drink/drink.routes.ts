import { NavigationPath } from '../../models';

export const DRINK_ROUTES = [
    {
        path: NavigationPath.Drink,
        loadComponent: () => import(/** webpackChunkName: "drinks" */ "./drink.component").then((c) => c.DrinkComponent)
    }
];
