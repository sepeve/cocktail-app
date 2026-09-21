import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { ZardPaginationImports } from '@/shared/components/pagination';
import { NgTemplateOutlet } from '@angular/common';
import { SearcherComponent } from '@/core/components/searcher/searcher.component';
import { Subject } from 'rxjs';
import { DrinkService } from '@/app/drink/drink.service';
import { DrinkStore } from '@/app/drink/drink.store';
import { CocktailListComponent } from '@/core/components/cocktail-list/cocktail-list.component';
import { LetterFilterComponent } from '@/core/components/letter-filter/letter-filter.component';
import { Drink, Letter, NavigationPath } from '@/models';
import { Router } from '@angular/router';

@Component({
    selector: "app-drink-list",
    templateUrl: "./drink-list.component.html",
    providers: [DrinkStore, DrinkService],
    imports: [ZardPaginationImports, CocktailListComponent, LetterFilterComponent, SearcherComponent],
})

export class DrinkListComponent implements OnInit {

    drinkStore = inject(DrinkStore);
    router = inject(Router);

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
        this.router.navigate([NavigationPath.Drink, drink.idDrink]);
    }

    private loadDrinksByLetter(letter: Letter): void {
        this.drinkStore.loadDrinksByLetter(letter);
    }
}
