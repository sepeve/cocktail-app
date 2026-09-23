import { CocktailCardComponent } from '@/core/components/cocktail-card/cocktail-card.component';
import { Drink } from '@/models';
import { ZardCardImports } from '@/shared/components/card/card.imports';
import { ZardCarouselImports } from '@/shared/components/carousel';
import { Component, input, output } from '@angular/core';

@Component({
    selector: "app-cocktail-carousel",
    templateUrl: "./cocktail-carousel.component.html",
    imports: [ZardCarouselImports, ZardCardImports, CocktailCardComponent]
})

export class CocktailCarouselComponent {
    cocktails = input.required<Drink[]>();
    cocktailClicked = output<Drink>();
}
