import { Component, input, output, OutputEmitterRef, Signal } from '@angular/core';
import { Drink } from '../../../models';

@Component({
    selector: "app-cocktail-list",
    templateUrl: "./cocktail-list.component.html"
})

export class CocktailListComponent {
    cocktails = input.required<Drink[]>();
    cocktailClicked = output<Drink>();
}
