import { LatestService } from '@/app/latest/latest.service';
import { LatestStore } from '@/app/latest/latest.store';
import { CocktailCarouselComponent } from '@/core/components/cocktail-carousel/cocktail-carousel.component';
import { CocktailSkeletonComponent } from '@/core/components/cocktail-skeleton/cocktail-skeleton.component';
import { Drink, NavigationPath } from '@/models';
import { Component, inject, OnInit, Signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: "app-latest",
    templateUrl: "./latest.component.html",
    providers: [LatestStore, LatestService],
    imports: [CocktailCarouselComponent, CocktailSkeletonComponent]
})
export class LatestComponent implements OnInit {
    latestStore = inject(LatestStore);
    router = inject(Router);

    drinks: Signal<Drink[]> = this.latestStore.drinks;
    loading: Signal<boolean> = this.latestStore.loading;

    ngOnInit(): void {
        this.latestStore.get();
    }

    onDrinkClicked({ idDrink }: Drink): void {
        const url = `${NavigationPath.Drink}/${idDrink}/${NavigationPath.Latest}`;
        this.router.navigateByUrl(url);
    }
}
