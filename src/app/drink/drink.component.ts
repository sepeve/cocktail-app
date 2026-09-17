import { Component, computed, inject, OnInit, signal, Signal } from '@angular/core';
import { DrinkStore } from './drink.store';
import { Drink, Letter, LetterDictionary } from '../../models';
import { DrinkService } from './drink.service';
import { ZardButtonComponent } from '@/shared/components/button';
import { CocktailListComponent } from '../../core/components/cocktail-list/cocktail-list.component';
import { ZardPaginationImports } from '@/shared/components/pagination';

@Component({
    selector: "app-drink",
    templateUrl: "./drink.component.html",
    providers: [DrinkStore, DrinkService],
    imports: [ZardButtonComponent, ZardPaginationImports, CocktailListComponent]
})

export class DrinkComponent implements OnInit {

    drinkStore = inject(DrinkStore);
    drinks: Signal<Drink[]> = this.drinkStore.drinks;
    loading: Signal<boolean> = this.drinkStore.loading;
    letters = Letter;
    letterDictionary: Signal<LetterDictionary[]> = computed(() => (Object.entries(Letter) as [keyof typeof Letter, Letter][]).map(
        ([key, value]) => ({ key, value })
    ));
    pages: Signal<number[]> = computed(() => Array.from({ length: this.drinkStore.totalPages() }, (_, i) => i + 1));

    ngOnInit(): void {
        this.loadDrinksByLetter(Letter.A);
    }

    onLetterClick(value: Letter): void {
        this.loadDrinksByLetter(value);
    }

    onSearch(name: string): void {
        this.drinkStore.loadDrinks(name);
    }

    onDrinkClicked(drink: Drink): void {
        console.log(drink);
    }

    private loadDrinksByLetter(letter: Letter): void {
        this.drinkStore.loadDrinksByLeter(letter);
    }
}
