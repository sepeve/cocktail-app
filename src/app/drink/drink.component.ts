import { Component, inject, Signal } from '@angular/core';
import { DrinkStore } from './drink.store';
import { Drink } from '../../models';
import { DrinkService } from './drink.service';

@Component({
    selector: "app-drink",
    templateUrl: "./drink.component.html",
    providers: [DrinkStore, DrinkService]
})

export class DrinkComponent {

    drinkStore = inject(DrinkStore);
    drinks: Signal<Drink[]> = this.drinkStore.drinks;
    loading: Signal<boolean> = this.drinkStore.loading;

    onSearch(name: string): void {
        this.drinkStore.loadDrinks(name);
    }
}
