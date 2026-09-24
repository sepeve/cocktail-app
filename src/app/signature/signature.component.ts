import { SignatureService } from '@/app/signature/signature.service';
import { SignatureStore } from '@/app/signature/signature.store';
import { Component, inject, OnInit, Signal } from '@angular/core';
import { CocktailCarouselComponent } from '@/core/components/cocktail-carousel/cocktail-carousel.component';
import { Router } from '@angular/router';
import { Drink, NavigationPath } from '@/models';
import { CocktailSkeletonComponent } from '@/core/components/cocktail-skeleton/cocktail-skeleton.component';

@Component({
    selector: "app-signature",
    templateUrl: "./signature.component.html",
    providers: [SignatureStore, SignatureService],
    imports: [CocktailCarouselComponent, CocktailSkeletonComponent]
})
export class SignatureComponent implements OnInit {
    signatureStore = inject(SignatureStore);
    router = inject(Router);

    drinks: Signal<Drink[]> = this.signatureStore.drinks;
    loading: Signal<boolean> = this.signatureStore.loading;

    ngOnInit(): void {
        this.signatureStore.get();
    }

    onDrinkClicked({ idDrink }: Drink): void {
        const url = `${NavigationPath.Drink}/${idDrink}/${NavigationPath.Signature}`;
        this.router.navigateByUrl(url);
    }
}
