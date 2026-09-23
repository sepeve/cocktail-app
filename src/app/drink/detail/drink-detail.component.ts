import { DrinkService } from '@/app/drink/drink.service';
import { DrinkStore } from '@/app/drink/drink.store';
import { Drink, NavigationPath } from '@/models';
import { Component, inject, OnInit, Signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CocktailDetailComponent } from '@/core/components/cocktail-detail/cocktail-detail.component';
import { CocktailSkeletonComponent } from '@/core/components/cocktail-skeleton/cocktail-skeleton.component';

@Component({
    selector: 'app-drink-detail',
    templateUrl: './drink-detail.component.html',
    imports: [CocktailDetailComponent, CocktailSkeletonComponent],
    providers: [DrinkStore, DrinkService]
})

export class DrinkDetailComponent implements OnInit {

    drinkStore = inject(DrinkStore);
    router = inject(Router);
    activatedRoute = inject(ActivatedRoute);
    drink: Signal<Drink | null> = this.drinkStore.drink;

    id: string | null = this.activatedRoute.snapshot.paramMap.get('id');
    path: string | null = this.activatedRoute.snapshot.paramMap.get('path');

    ngOnInit(): void {
        if (this.id) {
            this.drinkStore.getById(this.id);
        }
    }

    onBackClicked(): void {
        const path = this.path || NavigationPath.Drink;
        this.router.navigateByUrl(path);
    }
}
