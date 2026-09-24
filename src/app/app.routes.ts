import { Routes } from '@angular/router';
import { DRINK_ROUTES } from './drink/drink.routes';
import { HOME_ROUTES } from './home/home.router';
import { SIGNATURE_ROUTES } from './signature/signature.routes';
import { LATEST_ROUTES } from '@/app/latest/latest.routes';
import { NavigationPath } from '@/models';
import { RandomService } from '@/core/services/random.service';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export const routes: Routes = [
    ...HOME_ROUTES,
    ...DRINK_ROUTES,
    ...SIGNATURE_ROUTES,
    ...LATEST_ROUTES,
    {
        path: NavigationPath.Random,
        pathMatch: "full",
        redirectTo: async () => {
            const randomService = inject(RandomService);
            const drink = await firstValueFrom(randomService.get());

            if (drink) {
                const { idDrink } = drink;
                return `${NavigationPath.Drink}/${idDrink}`;
            }

            return NavigationPath.Main;

        }
    }
];
