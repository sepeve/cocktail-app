import { MocktailService } from '@/app/mocktail/mocktail.service';
import { MocktailStore } from '@/app/mocktail/mocktail.store';
import { CocktailListComponent } from '@/core/components/cocktail-list/cocktail-list.component';
import { Drink, NavigationPath } from '@/models';
import { ZardPaginationImports } from '@/shared/components/pagination';
import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: "app-moctail",
    templateUrl: "./mocktail.component.html",
    providers: [MocktailService, MocktailStore],
    imports: [ZardPaginationImports, CocktailListComponent]
})

export class MockatailComponent implements OnInit {

    mocktailStore = inject(MocktailStore);
    router = inject(Router);

    loading: Signal<boolean> = this.mocktailStore.loading;
    pages: Signal<number[]> = computed(() => Array.from({ length: this.mocktailStore.totalPages() }, (_, i) => i + 1));
    paginatedDrinks: Signal<Drink[]> = computed(() => {
        const startIndex = (this.mocktailStore.pageIndex()) * this.mocktailStore.pageSize();
        const endIndex = startIndex + this.mocktailStore.pageSize();
        return this.mocktailStore.drinks().slice(startIndex, endIndex);
    });

    ngOnInit(): void {
        this.mocktailStore.get();
    }

    onDrinkClicked({ idDrink }: Drink): void {
        const url = `${NavigationPath.Drink}/${idDrink}/${NavigationPath.Latest}`;
        this.router.navigateByUrl(url);
    }
}
