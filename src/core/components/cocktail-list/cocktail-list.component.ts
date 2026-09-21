import { Component, input, output } from '@angular/core';
import { Drink } from '../../../models';
import { CocktailCardComponent } from '../cocktail-card/cocktail-card.component';

@Component({
    selector: "app-cocktail-list",
    templateUrl: "./cocktail-list.component.html",
    imports: [CocktailCardComponent]
})

export class CocktailListComponent {
    cocktails = input.required<Drink[]>();
    cocktailClicked = output<Drink>();
}
