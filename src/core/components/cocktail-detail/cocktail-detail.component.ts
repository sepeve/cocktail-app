import { getCocktailIngredients, getCocktailMeasures } from '@/core/helpers/cocktail.helper';
import { Drink } from '@/models';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardCardImports } from '@/shared/components/card/card.imports';
import { ZardItemImports } from '@/shared/components/item/item.imports';
import { ZardSeparatorComponent } from '@/shared/components/separator/separator.component';
import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, input, output, Signal } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
    selector: 'app-cocktail-detail',
    templateUrl: './cocktail-detail.component.html',
    imports: [NgIcon, NgTemplateOutlet, ZardButtonComponent, ...ZardCardImports, ...ZardItemImports, ZardSeparatorComponent],
})

export class CocktailDetailComponent {
    cocktail = input.required<Drink>();
    backClicked = output<void>();

    ingredients: Signal<string[]> = computed(() => getCocktailIngredients(this.cocktail()));
    measures: Signal<string[]> = computed(() => getCocktailMeasures(this.cocktail()));
}
