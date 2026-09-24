import { DrinkService } from '@/app/drink/drink.service';
import { DrinkStore } from '@/app/drink/drink.store';
import { Drink, NavigationPath } from '@/models';
import { Component, DestroyRef, inject, OnInit, Signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CocktailDetailComponent } from '@/core/components/cocktail-detail/cocktail-detail.component';
import { CocktailSkeletonComponent } from '@/core/components/cocktail-skeleton/cocktail-skeleton.component';
import { map, filter, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-drink-detail',
    templateUrl: './drink-detail.component.html',
    imports: [CocktailDetailComponent, CocktailSkeletonComponent],
    providers: [DrinkStore, DrinkService]
})

export class DrinkDetailComponent implements OnInit {

    destroyRef = inject(DestroyRef);
    drinkStore = inject(DrinkStore);
    router = inject(Router);
    activatedRoute = inject(ActivatedRoute);
    drink: Signal<Drink | null> = this.drinkStore.drink;

    readonly drink$ = this.activatedRoute.paramMap.pipe(
        takeUntilDestroyed(this.destroyRef),
        map(params => params.get('id')),
        filter((id): id is string => id !== null),
        tap(id => this.drinkStore.getById(id))
    );

    ngOnInit(): void {
        this.drink$.subscribe();
    }

    onBackClicked(): void {
        const path = this.activatedRoute.snapshot.paramMap.get('path') || NavigationPath.Drink;
        this.router.navigateByUrl(path);
    }
}
