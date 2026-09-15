import { Routes } from '@angular/router';
import { DRINK_ROUTES } from './drink/drink.routes';
import { HOME_ROUTES } from './home/home.router';

export const routes: Routes = [
    ...HOME_ROUTES,
    ...DRINK_ROUTES
];
