import { Component, input, output } from '@angular/core';
import { Menu } from '../../../models';
import { NgIcon } from '@ng-icons/core';

@Component({
    selector: "app-menu-card",
    templateUrl: "./menu-card.component.html",
    imports: [NgIcon]
})

export class MenuCardComponent {
    menuItem = input.required<Menu>();
    menuItemClicked = output<string>();
}
