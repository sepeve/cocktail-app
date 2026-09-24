import { Routes } from '@angular/router';
import { DRINK_ROUTES } from './drink/drink.routes';
import { HOME_ROUTES } from './home/home.router';
import { SIGNATURE_ROUTES } from './signature/signature.routes';
import { LATEST_ROUTES } from '@/app/latest/latest.routes';

export const routes: Routes = [
    ...HOME_ROUTES,
    ...DRINK_ROUTES,
    ...SIGNATURE_ROUTES,
    ...LATEST_ROUTES
];
