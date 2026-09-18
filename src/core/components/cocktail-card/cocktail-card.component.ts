import { Component, computed, input, output } from '@angular/core';
import { Drink } from '../../../models';
import { ZardCardImports } from '@/shared/components/card/card.imports';

@Component({
    selector: "app-cocktail-card",
    templateUrl: "./cocktail-card.component.html",
    imports: [ZardCardImports]
})

export class CocktailCardComponent {
    cocktail = input.required<Drink>()
    cocktailClicked = output<void>();

    ingredients = computed(() => {
        const ingredients: string[] = [];
        for (let i = 1; i <= 15; i++) {
            const ingredient = this.cocktail()[`strIngredient${i}` as keyof Drink];
            if (ingredient?.length) {
                ingredients.push(ingredient);
            }
        }
        return ingredients;
    })
}
