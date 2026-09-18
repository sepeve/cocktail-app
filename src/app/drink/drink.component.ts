import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { DrinkStore } from './drink.store';
import { Drink, Letter } from '../../models';
import { DrinkService } from './drink.service';
import { CocktailListComponent } from '../../core/components/cocktail-list/cocktail-list.component';
import { ZardPaginationImports } from '@/shared/components/pagination';
import { LetterFilterComponent } from '../../core/components/letter-filter/letter-filter.component';
import { NgTemplateOutlet } from '@angular/common';
import { SearcherComponent } from '@/core/components/searcher/searcher.component';
import { Subject } from 'rxjs';

@Component({
    selector: "app-drink",
    templateUrl: "./drink.component.html",
    providers: [DrinkStore, DrinkService],
    imports: [ZardPaginationImports, CocktailListComponent, LetterFilterComponent, SearcherComponent],
})

export class DrinkComponent implements OnInit {

    drinkStore = inject(DrinkStore);
    loading: Signal<boolean> = this.drinkStore.loading;
    pages: Signal<number[]> = computed(() => Array.from({ length: this.drinkStore.totalPages() }, (_, i) => i + 1));
    paginatedDrinks: Signal<Drink[]> = computed(() => {
        const startIndex = (this.drinkStore.pageIndex()) * this.drinkStore.pageSize();
        const endIndex = startIndex + this.drinkStore.pageSize();
        return this.drinkStore.drinks().slice(startIndex, endIndex);
    });
    letterChanged: Subject<void> = new Subject<void>();

    ngOnInit(): void {
        this.loadDrinksByLetter(Letter.A);
    }

    ngOnDestroy(): void {
        this.letterChanged.complete();
    }

    onLetterClick(value: Letter): void {
        this.letterChanged.next();
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
