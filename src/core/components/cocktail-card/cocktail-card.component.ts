import { Component, computed, input, output } from '@angular/core';
import { Drink } from '../../../models';
import { ZardCardImports } from '@/shared/components/card/card.imports';
import { getCocktailIngredients } from '@/core/helpers/cocktail.helper';

@Component({
    selector: "app-cocktail-card",
    templateUrl: "./cocktail-card.component.html",
    imports: [ZardCardImports]
})

export class CocktailCardComponent {
    cocktail = input.required<Drink>()
    cocktailClicked = output<void>();
    ingredients = computed(() => getCocktailIngredients(this.cocktail()));
}
